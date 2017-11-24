<template>
  <v-layout row wrap>
    <v-flex xs12>
      <range-date-select
        :dateFromValue="resetpinData.dateFrom"
        :dateToValue="resetpinData.dateTo"
        :dateFromHandler="handleDateFrom"
        :dateToHandler="handleDateTo"
        :refresh="handleRefresh"
      />
      <table-data
        :dateFrom="resetpinData.dateFrom"
        :dateTo="resetpinData.dateTo"
        :table="resetpinData.table"
        :search="handleSearch">
        <v-data-table
          :headers="resetpinData.table.headers"
          :items="resetpinData.table.items"
          :search="resetpinData.table.search"
          class="white"
          slot="table"
          >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{props.item.num}}</td>
            <td class="text-xs-center">{{props.item.date}}</td>
            <td class="text-xs-center">#{{props.item.os_ticket}}</td>
            <td class="text-xs-left">{{props.item.no_hp}}</td>
            <td class="text-xs-center">{{props.item.status}}</td>
            <td class="text-xs-left">{{props.item.otpExpired}}</td>
            <td class="text-xs-center">
              <v-btn dark :class="props.item.status === '---' ? 'blue' : 'orange'"
              @click.native="handleReset(props.item)">
                reset
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </table-data>
    </v-flex>
  </v-layout>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'
import RangeDateSelect from 'page/home/components/RangeDateSelect/app'
import TableData from 'page/home/components/TableData/app'
import * as appAction from 'store/app/action-types'
import * as resetpinAction from 'store/resetpin/action-types'
import moment from 'moment'
import Global from '@/mixins/global'

export default {
  name: 'TableResetPin',
  mixins: [Global],
  computed: {
    ...mapGetters({
      resetpinData: resetpinAction.GET_RESETPIN_DATA,
      appFormProgress: appAction.GET_FORM_PROGRESS
    }),
    getMoment () {
      return moment
    }
  },
  created () {
    this.$store.commit(resetpinAction.SET_DATE_FROM, this.defaultDateFrom())
    this.$store.commit(resetpinAction.SET_DATE_TO, this.defaultDateTo())
    this.$store.dispatch(resetpinAction.LOAD_RESET_PIN_REQUEST_DATA, {
      success (response) {},
      error (response) {}
    })
  },
  methods: {
    ...mapMutations({
      handleDateFrom: resetpinAction.SET_DATE_FROM,
      handleDateTo: resetpinAction.SET_DATE_TO,
      handleSearch: resetpinAction.SEARCH_DATA_RESET_PIN
    }),
    handleRefresh () {
      this.$store.dispatch(resetpinAction.LOAD_RESET_PIN_REQUEST_DATA, {
        success (response) {},
        error (response) {}
      })
    },
    handleReset (data) {
      this.$store.commit(resetpinAction.SET_PHONENUMBER, data.no_hp)
      this.$store.commit(resetpinAction.SET_OSTICKET, data.os_ticket)
      this.$router.push('reset')
    }
  },
  components: {
    'range-date-select': RangeDateSelect,
    'table-data': TableData
  }
}
</script>
<style lang="scss" scoped>
</style>
