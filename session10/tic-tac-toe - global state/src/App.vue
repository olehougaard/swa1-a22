<script lang="ts">
  import LobbyView from '@/components/Lobby.vue'
  import WaitingView from '@/components/Waiting.vue'
  import GameView from '@/components/Game.vue'
  import {model} from './api/store'

  export default {
    data() {
      return {
        model,
        views: {
          'no game': LobbyView,
          waiting: WaitingView,
          playing: GameView
        }
      }
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
  <component :is="views[mode]" :gameNumber="gameNumber!"/>
</template>
