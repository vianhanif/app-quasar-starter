<template>
  <div class="hidden-xs-only">
    <v-btn flat outline
      light
      class="teal--text darken-4"
      disabled
      v-if="loginData.status.loged">
      <v-icon class="teal--text darken-4" style="margin-right: 10px;">account_circle</v-icon>
      <span>{{$session.get('user')}}</span>
    </v-btn>
    <v-btn
    light
    class="orange lighten-2 brown--text"
    v-if="loginData.status.loged"
    @click.native="handleClick()">
      {{hasSession}}
    </v-btn>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import * as loginAction from 'store/login/action-types'
import Global from '@/mixins/global'

export default {
  name: 'ToolbarMenu',
  mixins: [Global],
  computed: {
    ...mapGetters({
      loginData: loginAction.LOGIN_DATA
    }),
    hasSession () {
      return this.$session.exists() ? 'Logout' : 'Login'
    }
  },
  methods: {
    handleClick () {
      this.logout()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
