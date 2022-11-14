<script lang="ts">
  import type { Game } from '@/api/model'
  import * as api from '@/api/api'
  import { ref } from 'vue'

  const initGames: Game[] = await api.readGamesList()
  const games = ref(initGames)

  async function findGames() {
    const gs = await api.readGamesList()
    games.value = gs
    setTimeout(findGames, 250)
  }

  findGames()

  export default {
    data() {
      return {
        games,
        gameName: 'game'
      }
    },
    emits: {
      gameJoined(_: Game) {
        return true
      }
    },
    methods: {
      async joinGame(gamePromise: Promise<Game>) {
        const game = await gamePromise
        this.$emit('gameJoined', game)
      },
      async newGame() {
        this.joinGame(api.createGame(this.gameName))
      },
      async join(gameNumber: number) {
        this.joinGame(api.joinGame(gameNumber))
      }
    }
  }
</script>

<template>
  <div v-for="game in games">{{game.gameName}} <button @click="join(game.gameNumber)">Join</button></div>
  <input type="text" v-model="gameName"/> <button @click="newGame()">Create</button>
</template>
