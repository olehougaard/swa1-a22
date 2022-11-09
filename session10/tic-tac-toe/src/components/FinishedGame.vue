<script lang="ts">
  import type { Game, Player } from '@/api/model'
  import type { PropType } from 'vue'
  import BoardView from '@/components/Board.vue'

  export default {
        data(): {current: Game} {
          return { current: this.game }
        },
        inject: {
          lobbyCallback: {
            from: 'goToLobby',
            default: () => {}
          }
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
        methods: {
            message() {
                if (this.current.stalemate) 
                  return 'Stalemate'
                else
                  return this.current.winState?.winner + ' won!'
            },
            goToLobby() {
              const callback: () => void = this.lobbyCallback as () => void
              callback()
            }
        },
        components: { BoardView }
    }
</script>

<template>
  <div id = 'game'>
    <p id = 'messages'>{{ message() }}</p>
    <board-view :enabled='false' :board='current.board'/>
    <button @click="goToLobby">Return to lobby</button>
  </div>
</template>
