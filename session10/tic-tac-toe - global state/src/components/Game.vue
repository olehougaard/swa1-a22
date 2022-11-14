<script lang="ts">
  import ActiveGameView from '@/components/ActiveGame.vue'
  import FinishedGameView from '@/components/FinishedGame.vue'
  import {model} from '@/api/store'

  export default {
    data() {
      return {model}
    },
    computed: {
      active() {
        return !this.model.game?.stalemate && !this.model.game?.winState
      },
      gameName() {
        return this.model.game?.gameName
      },
      currentView() {
        if (this.active)
          return ActiveGameView
        else
          return FinishedGameView
      }
    },
    components: { ActiveGameView, FinishedGameView }
  }
</script>

<template>
  <h1>Playing {{gameName}} </h1>
  <component :is="currentView"/>
</template>
