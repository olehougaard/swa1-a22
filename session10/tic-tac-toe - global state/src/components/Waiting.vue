<script lang="ts">
import * as api from '@/api/api';
import { model } from '@/api/store';

  export default {
    data() {
      return {model};
    },
    props: {
      gameNumber: {
        type: Number,
        required: true
      }
    },
    methods: {
      async waitForPlayer() {
        const game = await api.readGame(this.gameNumber)
        if (game.ongoing)
          this.model.startGame('X', game)
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
