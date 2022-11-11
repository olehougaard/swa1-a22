<script lang="ts">
  import LobbyView from '@/components/Lobby.vue'
  import WaitingView from '@/components/Waiting.vue'
  import GameView from '@/components/Game.vue'
  import {model} from './api/store'

  export default {
    data() {
      return {model}
    },
    provide() {
      return {
        goToLobby: () => {
          this.model.endGame()
        }
      }
    },
    computed: {
      mode() { return this.model.gameState.mode },
      gameNumber() {
        if (this.model.gameState.mode !== 'no game')
          return this.model.gameState.game.gameNumber
      },
    },
    components: { GameView, LobbyView, WaitingView }
  }
</script>

<template>
  <lobby-view v-if="mode=='no game'"/>
  <waiting-view v-if="mode=='waiting'" :game-number="gameNumber!"/>
  <game-view v-if="mode=='playing'"/>
</template>
