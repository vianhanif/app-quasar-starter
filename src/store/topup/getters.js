import * as action from 'store/topup/action-types'

export default {
  [action.GET_TOPUP_DATA] (state) {
    return {
      dateFrom: state.dateFrom.value,
      dateTo: state.dateTo.value,
      table: state.table
    }
  }
}
