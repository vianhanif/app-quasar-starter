<template>
  <v-text-field
    type="password"
    :name="name"
    :label="label"
    :placeholder="placeholder"
    :id="'id_' + name"
    :maxlength="maxlength"
    :disabled="disabled"
    :required="required"
    :value="value"
    @input.native="handleInput"
  />
</template>
<script>
export default {
  name: 'Text',
  props: ['name', 'label', 'placeholder', 'maxlength', 'handler', 'disabled', 'required', 'value'],
  methods: {
    handleInput (e) {
      this.handler(e.target.value)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
