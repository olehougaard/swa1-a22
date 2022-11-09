<script lang="ts">
import type { Game, Player } from '@/api/model';
import * as api from '@/api/api';
import type { PropType } from 'vue';

  export default {
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
    emits: ['gameStarted'],
    methods: {
      async waitForPlayer() {
        const game = await api.readGame(this.game.gameNumber)
        if (game.ongoing)
          this.$emit('gameStarted')
        else 
          setTimeout(this.waitForPlayer, 100)
      }
    },
    mounted() {
      this.waitForPlayer()
    } 
  }
</script>

<template>
  <h1>Waiting for other player...</h1>
</template>
