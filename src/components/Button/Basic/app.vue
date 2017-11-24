<template>
  <v-btn
    :class="color"
    :disabled="disabled"
    :flat="flat"
    @click.native="handler"
  >
    {{label}}
  </v-btn>
</template>
<script>
export default {
  name: 'Button',
  props: ['label', 'handler', 'color', 'disabled', 'flat']
}
</script>
<style lang="scss" scoped>
</style>
