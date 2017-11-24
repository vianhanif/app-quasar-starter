<template>
  <v-dialog persistent
    :value="dialog"
  >
    <slot></slot>
  </v-dialog>
</template>
<script>
export default {
  name: 'Dialog',
  props: ['dialog']
}
</script>
<style lang="scss" scoped>
</style>
