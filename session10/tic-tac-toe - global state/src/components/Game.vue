<script lang="ts">
  import ActiveGameView from '@/components/ActiveGame.vue'
  import FinishedGameView from '@/components/FinishedGame.vue'
  import {model} from '@/api/store'

  export default {
    data() {
      return {model}
    },
    computed: {
      gameName() {
        return this.model.game?.gameName
      },
      active() {
        return !this.model.game?.stalemate && !this.model.game?.winState
      },
    },
    components: { ActiveGameView, FinishedGameView }
  }
</script>

<template>
  <h1>Playing {{gameName}} </h1>
  <active-game-view v-if='active'/>
  <finished-game-view v-else />
</template>
