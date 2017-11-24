<template>
  <v-text-field
    type="number"
    :name="name"
    :label="label"
    :placeholder="placeholder"
    :id="'id_' + name"
    :maxlength="maxlength"
    :value="value"
    :disabled="disabled"
    @input.native="handleInput"
  />
</template>
<script>
export default {
  name: 'Text',
  props: ['name', 'label', 'placeholder', 'maxlength', 'handler', 'disabled', 'value', 'disabled'],
  methods: {
    handleInput (e) {
      this.handler(e.target.value)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
