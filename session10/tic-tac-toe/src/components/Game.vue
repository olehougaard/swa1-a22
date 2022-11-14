<script lang="ts">
  import type { Game, Player } from '@/api/model'
  import type { PropType } from 'vue'
  import ActiveGameView from '@/components/ActiveGame.vue'
  import FinishedGameView from '@/components/FinishedGame.vue'


  export default {
        data(): {current: Game} {
          return { current: this.game }
        },
        props: {
          player: {
            type: Object as PropType<Player>,
            required: true
          },
          game: {
            type: Object as PropType<Game>,
            required: true
          }
        },
        emits: ['goToLobby'],
        computed: {
          active() {
            return !this.current.stalemate && !this.current.winState
          },
        },
        methods: {
            onFinished(g: Game) {
              this.current = g
            }
        },
        components: { ActiveGameView, FinishedGameView }
    }
</script>

<template>
    <h1>Playing {{game.gameName}} </h1>
    <active-game-view v-if='active' :game='current' :player="player" @game-finished="onFinished"/>
    <finished-game-view v-else :game='current' :player="player" @go-to-lobby="$emit('goToLobby')"/>
</template>
