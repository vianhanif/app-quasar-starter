<template>
  <div>
    <v-snackbar
        :timeout="timeout"
        :success="context === 'success'"
        :info="context === 'info'"
        :warning="context === 'warning'"
        :error="context === 'error'"
        :primary="context === 'primary'"
        :secondary="context === 'secondary'"
        :top="y === 'top'"
        :bottom="y === 'bottom'"
        :right="x === 'right'"
        :left="x === 'left'"
        :multi-line="true"
        :vertical="false"
        :value="show"
      >
      <span style="font-size: 16px;">{{text}}</span>
      <v-btn dark flat @click.native="handler()" style="font-size: 16px;color:yellow;">Close</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: 'Snackbar',
  props: ['show', 'text', 'context', 'x', 'y', 'handler'],
  data: () => ({
    timeout: 0
  })
}
</script>
<style lang="scss" scoped>
</style>
