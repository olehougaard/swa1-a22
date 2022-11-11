<script lang="ts">
  import * as api from '@/api/api'
  import BoardView from '@/components/Board.vue'
  import { model } from '@/api/store'

  export default {
    data() {
      return { model }
    },
    computed: {
      enabled() {
        return this.model.player === this.model.game?.inTurn
      },
      finished() {
        return this.model.game?.stalemate || this.model.game?.winState
      },
      board() {
        return this.model.game?.board ?? []
      }
    },
    methods: {
      message() {
        if (this.enabled)
          return 'Your turn, ' + this.model.player
        else
          return 'Waiting for other player to move...'
      },
      async makeMove(x: number, y: number) {
        if (this.enabled) {
          const {move, ...props} = await api.createMove(this.model.game?.gameNumber!, {x, y, player: this.model.player!})
          this.model.makeMove(move)
          this.model.applyGameProperties(props)
          if (!this.finished) this.waitForMove()
        }
      },
      async waitForMove() {
        const {moves, ...props} = await api.readMoves(this.model.game?.gameNumber!)
        if (props.inTurn === this.model.player) {
          const move = moves[moves.length - 1]
          if (!move.conceded) this.model.makeMove(move)
          this.model.applyGameProperties(props)
        } else 
          setTimeout(this.waitForMove, 1000)
      },
      async concede() {
        const {winState} = await api.concede(this.model.game?.gameNumber!, this.model.player === 'X' ? 'O' : 'X')
        this.model.applyGameProperties({winState})
      }
    },
    mounted() {
      if (this.model.game?.inTurn !== this.model.player) this.waitForMove()
    },
    components: { BoardView }
  }
</script>

<template>
  <div id = 'game'>
    <p id = 'messages'>{{ message() }}</p>
    <board-view :enabled='enabled' :board='board' @click='makeMove'/>
    <button v-if="enabled" @click="concede">Concede</button>
  </div>
</template>
