<script lang="ts">
  import * as api from '@/api/api'
  import { model } from '@/api/store'

  export default {
    data() {
      return {
        model,
        gameName: 'game'
      }
    },
    methods: {
      async newGame() {
        const game = await api.createGame(this.gameName)
        this.model.waitForPlayer('X', game)
      },
      async join(gameNumber: number) {
        const game = await api.joinGame(gameNumber)
        this.model.startGame('O', game)
      }
    },
    mounted() {
      const findGames = async () => {
        const gs = await api.readGamesList()
        this.model.games = gs
        setTimeout(findGames, 250)
      }

      findGames()
    }
  }
</script>

<template>
  <div v-for="game in model.games">{{game.gameName}} <button @click="join(game.gameNumber)">Join</button></div>
  <input type="text" v-model="gameName"/> <button @click="newGame()">Create</button>
</template>
