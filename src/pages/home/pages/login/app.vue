<template>
  <v-layout row wrap>
    <v-flex xs12 offset-xs0 sm6 offset-sm3 md4 offset-md4 lg3 offset-lg4>
      <v-card class="mt-5 lighten-4 elevation-4">
        <v-progress-linear
          v-if="appFormProgress"
          :indeterminate="true"
          height="3"
          success
        />
        <v-card-text class="text-xs-center">
          <email-field
            required
            name="username"
            label="Username"
            placeholder="Masukkan Username"
            @keyup.native="handleEnterKey"
            :handler="handleUsername"
            :value="loginData.username"
            :disabled="appFormProgress"
          />
          <password-field
            required
            name="password"
            label="Password"
            @keyup.native="handleEnterKey"
            placeholder="Masukkan Password"
            :handler="handlePassword"
            :value="loginData.password"
            :disabled="appFormProgress"
          />
          <div class="text-xs-right">
            <button-basic
              label="Login"
              :handler="handleLogin"
              color="primary"
              :disabled="appFormProgress"
            />
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import EmailField from 'components/Fields/Email/app'
import PasswordField from 'components/Fields/Password/app'
import ButtonBasic from 'components/Button/Basic/app'
import {mapGetters} from 'vuex'
import * as appAction from 'store/app/action-types'
import * as loginAction from 'store/login/action-types'
import * as queryAction from 'store/query/action-types'

export default {
  name: 'Login',
  computed: {
    ...mapGetters({
      loginData: loginAction.LOGIN_DATA,
      readyToSubmitLogin: loginAction.READY_TO_SUBMIT_LOGIN,
      appFormProgress: appAction.GET_FORM_PROGRESS,
      query: queryAction.GET_QUERY
    })
  },
  created () {
    this.$store.commit(appAction.CLOSE_ALERT)
  },
  methods: {
    handleUsername (value) {
      this.$store.commit(loginAction.SET_USERNAME, value)
    },
    handlePassword (value) {
      this.$store.commit(loginAction.SET_PASSWORD, value)
    },
    handleEnterKey (e) {
      if (e.keyCode === 13) {
        this.handleLogin()
      }
    },
    handleLogin () {
      if (this.readyToSubmitLogin) {
        this.$store.commit(appAction.SHOW_SNACKBAR, {
          context: 'info',
          text: 'Memulai Otentikasi'
        })
        let self = this
        this.$store.commit(appAction.START_SUBMIT_FORM)
        this.$store.dispatch(loginAction.AUTH_USER,
          {
            headers: this.query,
            data: {
              ...this.loginData
            },
            success (response) {
              self.$store.commit(appAction.STOP_SUBMIT_FORM)
              if (response.responseStatus === 1) {
                self.$session.start()
                self.$session.set('user', self.loginData.username)
                self.$localStorage.set('user', self.loginData.username)
                window.location.reload()
              } else {
                self.$store.commit(appAction.SHOW_SNACKBAR, {
                  context: 'error',
                  text: 'username/password salah'
                })
              }
            }
          }
        )
      } else {
        this.$store.commit(appAction.SHOW_DIALOG, {
          title: 'Perhatian!',
          text: 'Masukkan username dan password anda'
        })
      }
    }
  },
  components: {
    'email-field': EmailField,
    'password-field': PasswordField,
    'button-basic': ButtonBasic
  }
}
</script>
<style lang="scss" scoped>
</style>
