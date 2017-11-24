<template>
  <div>
    <v-card-text v-if="!appFormProgress">
      Data dari <b>{{getMoment(dateFrom).format(`DD MMM YYYY`)}}</b> hingga <b>{{getMoment(dateTo).format(`DD MMM YYYY`)}}</b>
    </v-card-text>
    <v-card class="elevation-2 pt-2 pl-2 pr-2 pb-2">
      <text-field
        required
        name="search"
        label="Search"
        placeholder="Search"
        :handler="search"
        :value="table.search"
      />
      <slot name="table"></slot>
    </v-card>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import TextField from 'components/Fields/Text/app'
import * as appAction from 'store/app/action-types'
import moment from 'moment'

export default {
  name: 'TableDataApp',
  props: ['dateFrom', 'dateTo', 'search', 'table'],
  computed: {
    ...mapGetters({
      appFormProgress: appAction.GET_FORM_PROGRESS
    }),
    getMoment () {
      return moment
    }
  },
  data: () => ({

  }),
  components: {
    'text-field': TextField
  }
}
</script>
<style lang="scss" scoped>
</style>
