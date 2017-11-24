<template>
  <v-alert
    dismissible
    v-model="show"
    :class="context">
      {{text}}
  </v-alert>
</template>
<script>
export default {
  name: 'Alert',
  props: ['text', 'context', 'show']
}
</script>
<style lang="scss" scoped>
</style>
