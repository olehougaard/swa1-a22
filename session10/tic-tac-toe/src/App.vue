<script lang="ts">
  import LobbyView from '@/components/Lobby.vue'
  import WaitingView from '@/components/Waiting.vue'
  import GameView from '@/components/Game.vue'
  import type { Game, GameState } from './api/model'

  type AppState = {
    gameState: GameState
  }

  export default {
    data(): AppState {
      return {
        gameState: {mode: 'no game'}
      }
    },
    provide() {
      return {
        goToLobby: () => {
          this.gameState.mode = 'no game'
        }
      }
    },
    methods: {
      gameJoined(game: Game) {
        if (game.ongoing)
          this.gameState = {mode: 'playing', player: 'O', game}
        else 
          this.gameState = {mode: 'waiting', player: 'X', game}
      },
      gameStarted() {
        this.gameState.mode = 'playing'
      }
    },
    components: { GameView, LobbyView, WaitingView }
  }
</script>

<template>
  <lobby-view v-if="gameState.mode=='no game'" @game-joined="gameJoined"/>
  <waiting-view v-if="gameState.mode=='waiting'" :player="gameState.player" :game="gameState.game" @game-started="gameStarted"/>
  <game-view v-if="gameState.mode=='playing'" :player="gameState.player" :game="gameState.game"/>
</template>
