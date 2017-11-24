import * as action from 'store/resetpin/action-types'

export default {
  [action.GET_RESETPIN_DATA] (state) {
    return {
      phonenumber: state.phonenumber.value,
      osticket: state.osticket.value,
      dateFrom: state.dateFrom.value,
      dateTo: state.dateTo.value,
      table: state.table
    }
  }
}
