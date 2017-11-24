<template>
  <dialog-basic
    :dialog="open">
    <v-card>
      <v-card-title class="headline">
        {{title}}
      </v-card-title>
      <v-card-text>
        {{text}}
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <button-basic
          label="Ok"
          :handler="handler"
          color="green--text darken-1"
          flat="flat"
        />
      </v-card-actions>
    </v-card>
  </dialog-basic>
</template>
<script>
import DialogBasic from 'components/Dialog/Basic/app'
import ButtonBasic from 'components/Button/Basic/app'

export default {
  name: 'StandardDialog',
  props: ['open', 'title', 'text', 'handler'],
  components: {
    'dialog-basic': DialogBasic,
    'button-basic': ButtonBasic
  }
}
</script>
<style lang="scss" scoped>
</style>
