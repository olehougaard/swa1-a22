<script lang="ts">
  import BoardView from '@/components/Board.vue'
  import { model } from '@/api/store'

  export default {
    data() {
      return {model}
    },
    computed: {
      board() {
        return this.model.game?.board ?? []
      },
      message() {
          if (this.model.game?.stalemate) 
            return 'Stalemate'
          else
            return this.model.game?.winState?.winner + ' won!'
      },
    },
    methods: {
        goToLobby() {
          this.model.endGame()
        }
    },
    components: {BoardView}
  }
</script>

<template>
  <div id = 'game'>
    <p id = 'messages'>{{ message }}</p>
    <board-view :enabled='false' :board='board'/>
    <button @click="goToLobby">Return to lobby</button>
  </div>
</template>
