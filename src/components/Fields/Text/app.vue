<template>
  <v-text-field
    :name="name"
    :label="label"
    :placeholder="placeholder"
    :id="'id_' + name"
    :maxlength="maxlength"
    :value="value"
    @input.native="handleInput"
  />
</template>
<script>
export default {
  name: 'Text',
  props: ['name', 'label', 'placeholder', 'maxlength', 'handler', 'disabled', 'value'],
  methods: {
    handleInput (e) {
      this.handler(e.target.value)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
