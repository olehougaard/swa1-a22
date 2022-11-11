<script lang="ts">
  import type { Board } from '@/api/model'
  import type { PropType } from 'vue'

  type Tile = { x: number, y: number, piece: 'X' | 'O' | null }

  export default {
        props: {
          enabled: {
            type: Boolean,
            required: true
          },
          board: {
            type: Object as PropType<Board>,
            required: true
          }
        },
        emits: {
          click(x: number, y: number) {
            return 0 <= x && x < 3 && 0 <= y && y < 3
          }
        },
        methods: {
            tileClass(tile: Tile) {
              if (tile.piece)
                return tile.piece
              else if (this.enabled)
                return 'blank'
              else
                return 'inert'
            },
            tiles(): Tile[][] {
              return this.board.map((row, y) => row.map((piece, x) => ({x, y, piece})))
            },
            makeMove(x: number, y: number) {
              if (this.enabled && this.board[y][x] === null) {
                this.$emit('click', x, y)
              }
            }
        }
    }
</script>

<template>
    <table id = 'board'>
        <tr v-for='row in tiles()'>
          <td v-for='tile in row' :class='tileClass(tile)' @click='makeMove(tile.x, tile.y)'></td>
        </tr>
    </table>
</template>

<style>
td {
  width: 40px;
  height: 40px;
  border: 1px solid black;
}
td.blank {
  background: white;
  cursor: pointer;
}
td.inert {
  background: white;
}
td.X {
  background-image: url(@/assets/X.png);
}
td.O {
  background-image: url(@/assets/O.png);
}
table {
  border: 1px solid black;
  border-spacing: 0;
}
</style>