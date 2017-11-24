<template>
  <v-layout row wrap>
    <v-flex mt-5 xs12 offset-xs0 sm6 offset-sm3 md4 offset-md4 lg3 offset-lg4>
      <v-card class="mt-5 white lighten-4 elevation-4">
        <v-progress-linear
          v-if="tickRunning"
          :value="tickProgress"
          height="3"
          success
        />
        <v-card-text class="text-xs-center">
          <h6 class="text-xs-left">OS Ticket : #{{resetpinData.osticket}}</h6>
          <number-field
            required
            name="phonenumber"
            label="No HP"
            placeholder="Masukkan No HP"
            :handler="handlePhoneNumber"
            :value="resetpinData.phonenumber"
            :disabled="true"
          />
          <div class="text-xs-right">
            <span v-if="tickRunning">
              coba lagi [{{time.minute}}:{{time.second}}]
            </span>
            <button-basic
              label="Kirim OTP Reset PIN"
              :handler="handleSubmit"
              color="primary"
              :disabled="tickRunning"
            />
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import NumberField from 'components/Fields/Number/app'
import ButtonBasic from 'components/Button/Basic/app'
import {mapGetters} from 'vuex'
import * as appAction from 'store/app/action-types'
import * as resetpinAction from 'store/resetpin/action-types'
import * as queryAction from 'store/query/action-types'

export default {
  name: 'ResetPIN',
  computed: {
    ...mapGetters({
      resetpinData: resetpinAction.GET_RESETPIN_DATA,
      appFormProgress: appAction.GET_FORM_PROGRESS,
      query: queryAction.GET_QUERY
    })
  },
  created () {
    this.$store.commit(appAction.CLOSE_ALERT)
  },
  mounted () {
    setInterval(() => {
      if (this.tickRunning) {
        this.tick += 1
        this.tickProgress = (this.tick / (this.time.default.second + (this.time.default.minute * this.time.default.second) + this.time.default.hour * (this.time.default.minute * this.time.default.second))) * 100
        if (this.time.second > 0) {
          this.tickRunning = true
          this.time.second -= 1
        } else if (this.time.second === 0 && this.time.minute > 0) {
          this.time.minute -= 1
        } else if (this.time.minute === 0 && this.time.second === 0 && this.time.hour > 0) {
          this.time.hour -= 1
        } else if (this.time.second === 0 && this.time.minute === 0 && this.time.hour === 0) {
          this.tickRunning = false
          this.tickProgress = 0
        }
      }
    }, 1000)
  },
  methods: {
    resetTick () {
      this.time.second = this.time.default.second
      this.time.minute = this.time.default.minute
      this.time.hour = this.time.default.hour
    },
    startTicking () {
      this.tickRunning = true
    },
    handlePhoneNumber (value) {
      this.$store.commit(resetpinAction.SET_PHONENUMBER, value)
    },
    handleSubmit () {
      this.$store.commit(appAction.CLOSE_ALERT)
      if (typeof this.resetpinData.phonenumber !== 'undefined' && this.resetpinData.phonenumber !== '') {
        if (!this.tickRunning) {
          this.resetTick()
          this.$store.commit(appAction.START_SUBMIT_FORM)
          this.$store.commit(appAction.SHOW_SNACKBAR, {
            context: 'primary',
            text: `Memulai mengirimkan OTP Reset untuk ${this.resetpinData.phonenumber}`,
            x: 'right',
            y: 'top'
          })
          this.startTicking()
          let self = this
          this.$store.dispatch(resetpinAction.REQUEST_OTP, {
            headers: this.query,
            data: {
              handphoneNumber: String(this.resetpinData.phonenumber),
              ticketNumber: String(this.resetpinData.osticket)
            },
            success (response) {
              if (response.responseStatus === 1) {
                self.$store.commit(appAction.SHOW_SNACKBAR, {
                  context: 'success',
                  text: `OTP Reset terkirim ke ${self.resetpinData.phonenumber}`
                })
                self.$store.commit(appAction.STOP_SUBMIT_FORM)
              } else {
                self.$store.commit(appAction.SHOW_SNACKBAR, {
                  context: 'error',
                  text: `OTP gagal terkirim`,
                  x: 'right',
                  y: 'top'
                })
              }
            },
            error (response) {
              this.$store.commit(appAction.SHOW_SNACKBAR, {
                context: 'error',
                text: `OTP gagal terkirim`,
                x: 'right',
                y: 'top'
              })
            }
          })
          window.setTimeout(() => {

          }, 3000)
        }
      } else {
        this.$store.commit(appAction.SHOW_DIALOG, {
          text: 'Masukkan No HP User yang ingin diberikan Token Reset'
        })
      }
    }
  },
  data () {
    return {
      tickProgress: 0,
      tickRunning: false,
      tick: 0,
      time: {
        hour: 0,
        minute: 1,
        second: 60,
        default: {
          hour: 0,
          minute: 1,
          second: 60
        }
      }
    }
  },
  components: {
    'number-field': NumberField,
    'button-basic': ButtonBasic
  }
}
</script>
<style lang="scss" scoped>
</style>
