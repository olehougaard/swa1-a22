<script lang="ts">
  import type { Game, Player } from '@/api/model'
  import type { PropType } from 'vue'
  import * as api from '@/api/api'
  import BoardView from '@/components/Board.vue'

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
        computed: {
          enabled() {
            return this.player === this.current.inTurn
          },
        },
        emits: {
          gameFinished(game: Game) {
            return game.stalemate || game.winState
          }
        },
        methods: {
          finished() {
            return this.current.stalemate || this.current.winState
          },
          message() {
            if (this.enabled)
              return 'Your turn, ' + this.player
            else
              return 'Waiting for other player to move...'
          },
          async makeMove(x: number, y: number) {
            if (this.player === this.current.inTurn) {
              const {move, ...props} = await api.createMove(this.current.gameNumber, {x, y, player: this.player})
              this.current.board[move.y][move.x] = move.player
              this.current = {...this.current, ...props}
              if (this.finished())
                this.$emit('gameFinished', this.current)
              else
                this.waitForMove()
            }
          },
          async waitForMove() {
            const { moves, inTurn, winState, stalemate } = await api.readMoves(this.current.gameNumber)
            console.log(moves, inTurn, winState, stalemate)
            if (inTurn === this.player) {
              const move = moves[moves.length - 1]
              if (!move.conceded) this.current.board[move.y][move.x] = move.player
              this.current.inTurn = inTurn
              this.current.winState = winState
              this.current.stalemate = stalemate
              if (this.finished())
                this.$emit('gameFinished', this.current)
            } else 
              setTimeout(this.waitForMove, 1000)
          },
          async concede() {
            this.current = await api.concede(this.current.gameNumber, this.player === 'X' ? 'O' : 'X')
            this.$emit('gameFinished', this.current)
          }
        },
        mounted() {
          if (this.current.inTurn !== this.player) this.waitForMove()
        },
        components: { BoardView }
    }
</script>

<template>
  <div id = 'game'>
    <p id = 'messages'>{{ message() }}</p>
    <board-view :enabled='enabled' :board='current.board' @click='makeMove'/>
    <button v-if="enabled" @click="concede">Concede</button>
  </div>
</template>
