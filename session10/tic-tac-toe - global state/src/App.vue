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
      currentView() {
        switch(this.mode) {
          case 'no game':
            return LobbyView
          case 'waiting':
            return WaitingView
          case 'playing':
            return GameView
        }
      }
    },
    components: { GameView, LobbyView, WaitingView }
  }
</script>

<template>
  <component :is="currentView" :game-number="gameNumber!"/>
</template>
