<template>
  <v-layout row wrap>
    <v-flex xs12>
      <range-date-select
        :dateFromValue="topupData.dateFrom"
        :dateToValue="topupData.dateTo"
        :dateFromHandler="handleDateFrom"
        :dateToHandler="handleDateTo"
        :refresh="handleRefresh"
      />
      <table-data
        :dateFrom="topupData.dateFrom"
        :dateTo="topupData.dateTo"
        :table="topupData.table"
        :search="handleSearch">
        <v-data-table
          :headers="topupData.table.headers"
          :items="topupData.table.items"
          :search="topupData.table.search"
          slot="table"
          >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{props.item.num}}</td>
            <td class="text-xs-center">{{props.item.date}}</td>
            <td class="text-xs-left">{{props.item.name}}</td>
            <td class="text-xs-center">{{props.item.no_hp}}</td>
            <td class="text-xs-center">{{props.item.bank_name}}</td>
            <td class="text-xs-center">{{props.item.bank_account}}</td>
            <td class="text-xs-center">{{props.item.status}}</td>
            <td class="text-xs-center">
              <v-btn dark
              :outline="props.item.status === 'Sukses'"
              :class="props.item.status !== 'Sukses' ? 'green' : 'orange orange--text'"
              :disabled="appFormProgress || props.item.status === 'Sukses' || props.item.status === 'Expired'"
              @click.native="handleTopup(props.item.data)">
                <b>TOP UP</b>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </table-data>
    </v-flex>
  </v-layout>
</template>
<script>
import RangeDateSelect from 'page/home/components/RangeDateSelect/app'
import TextField from 'components/Fields/Text/app'
import TableData from 'page/home/components/TableData/app'
import ButtonBasic from 'components/Button/Basic/app'
import {mapGetters} from 'vuex'
import * as appAction from 'store/app/action-types'
import * as topupAction from 'store/topup/action-types'
import * as queryAction from 'store/query/action-types'
import moment from 'moment'
import Global from '@/mixins/global'

export default {
  name: 'TopUpApp',
  mixins: [Global],
  computed: {
    ...mapGetters({
      topupData: topupAction.GET_TOPUP_DATA,
      appFormProgress: appAction.GET_FORM_PROGRESS,
      query: queryAction.GET_QUERY
    }),
    getMoment () {
      return moment
    }
  },
  created () {
    this.$store.commit(topupAction.SET_DATE_FROM, this.defaultDateFrom())
    this.$store.commit(topupAction.SET_DATE_TO, this.defaultDateTo())
    this.$store.dispatch(topupAction.LOAD_TOPUP_LIST, {
      success (response) {},
      error (response) {}
    })
  },
  methods: {
    handleRefresh () {
      this.$store.dispatch(topupAction.LOAD_TOPUP_LIST, {
        success (response) {},
        error (response) {}
      })
    },
    handleDateFrom (value) {
      this.$store.commit(topupAction.SET_DATE_FROM, value)
    },
    handleDateTo (value) {
      this.$store.commit(topupAction.SET_DATE_TO, value)
    },
    handleSearch (value) {
      this.$store.commit(topupAction.SEARCH_DATA_TOPUP, value)
    },
    handleTopup (data) {
      let self = this
      this.$store.dispatch(topupAction.EXECUTE_TOPUP, {
        data,
        success (response) {
          self.$store.dispatch(topupAction.LOAD_TOPUP_LIST, {
            success (response) {},
            error (response) {}
          })
        },
        error (response) {}
      })
      // this.$store.commit(topupAction.SET_PHONENUMBER, data.no_hp)
      // this.$store.commit(topupAction.SET_OSTICKET, data.os_ticket)
      // this.$router.push('reset')
    }
  },
  components: {
    'range-date-select': RangeDateSelect,
    'text-field': TextField,
    'button-basic': ButtonBasic,
    'table-data': TableData
  }
}
</script>
<style lang="scss" scoped>
</style>
