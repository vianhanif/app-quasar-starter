<template>
  <v-layout row wrap>
    <v-flex lg7>
      <v-card class="white elevation-2 pt-0 pl-0 pr-0 pb-0 mb-4 mt-5">
        <v-progress-linear
          :indeterminate="appFormProgress"
          :value="appFormProgress ? 0 : 100"
          height="5"
          style="margin-bottom:0px;"
          warning
        />
        <v-card class="pr-4 pl-4 pt-4 elevation-0">
          <v-layout row wrap>
            <v-flex xs12 sm4>
              <v-menu
                lazy
                :close-on-content-click="false"
                v-model="openDateFrom"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-left="40"
                max-width="290px">
                <v-text-field
                  slot="activator"
                  label="Dari"
                  v-model="dateFrom"
                  :value="dateFrom"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="dateFrom" no-title :dark="appConfig.light" actions @click.native="handleDateFrom"/>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm4>
              <v-menu
                lazy
                :close-on-content-click="false"
                v-model="openDateTo"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-left="40"
                max-width="290px">
                <v-text-field
                  slot="activator"
                  label="Hingga"
                  v-model="dateTo"
                  prepend-icon="event"
                  :value="dateTo"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="dateTo" no-title :dark="appConfig.light" actions @click.native="handleDateTo"/>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm4>
              <div style="float: right;">
                <button-basic
                  label="Refresh"
                  :handler="handleRefresh"
                  color="primary"
                  :disabled="appFormProgress"
                />
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import ButtonBasic from 'components/Button/Basic/app'
import {mapGetters} from 'vuex'
import * as appAction from 'store/app/action-types'
import moment from 'moment'

const defaultDateFrom = () => {
  let thisMonth = moment(new Date()).format('YYYY-MM')
  let _weekBeforeToday = new Date()
  _weekBeforeToday.setDate(_weekBeforeToday.getDate() - 7)
  let weekBeforeToday = moment(_weekBeforeToday).format('DD')
  return `${thisMonth}-${weekBeforeToday}`
}

const defaultDateTo = () => {
  let moment = require('moment')
  let today = moment(new Date()).format('YYYY-MM-DD')
  return today
}

export default {
  name: 'RangeDateSelectApp',
  props: ['refresh', 'dateFromHandler', 'dateToHandler', 'dateFromValue', 'dateToValue'],
  computed: {
    ...mapGetters({
      appFormProgress: appAction.GET_FORM_PROGRESS,
      appConfig: appAction.GET_APP_CONFIG
    })
  },
  methods: {
    handleRefresh () {
      this.refresh()
    },
    handleDateFrom () {
      this.dateFromHandler(this.dateFrom)
    },
    handleDateTo () {
      this.dateToHandler(this.dateTo)
    }
  },
  data: () => ({
    openDateFrom: false,
    openDateTo: false,
    dateFrom: defaultDateFrom(),
    dateTo: defaultDateTo()
  }),
  components: {
    'button-basic': ButtonBasic
  }
}
</script>
<style lang="scss" scoped>
</style>
