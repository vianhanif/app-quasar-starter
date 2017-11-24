<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as appAction from 'store/app/action-types'
import * as loginAction from 'store/login/action-types'

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      loginData: loginAction.LOGIN_DATA
    })
  },
  head: {
    title: {
      inner: 'M-Pay Dashboard'
    },
    link: [
      {
        rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      },
      {
        rel: 'icon', href: require('assets/app/mpay.png'), sizes: '16x16', type: 'image/png'
      }
    ]
  },
  mounted () {
    if (this.$localStorage.get('user') !== null) {
      this.$session.start()
      this.$session.set('user', this.$localStorage.get('user'))
    }
    if (!this.$session.exists()) {
      this.$router.replace('/home/login')
    } else {
      this.$store.commit(appAction.SHOW_SNACKBAR, {
        context: 'success',
        text: 'Otentikasi berhasil'
      })
      this.$store.commit(loginAction.SET_USER_IS_LOGIN)
      this.$store.commit(appAction.OPEN_DRAWER)
      if (this.$route.path.indexOf('login') !== -1) {
        this.$router.replace('/home/dashboard')
      }
    }
  }
}
</script>

<style lang="scss">
  @import "./assets/scss/base";
</style>
