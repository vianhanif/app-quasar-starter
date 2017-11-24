import * as action from 'store/topup/action-types'
import moment from 'moment'

export default {
  [action.SET_DATE_FROM] ({dateFrom}, value) {
    dateFrom.value = value
  },
  [action.SET_DATE_TO] ({dateTo}, value) {
    dateTo.value = value
  },
  [action.SEARCH_DATA_TOPUP] ({table}, value) {
    table.search = value
  },
  [action.LOAD_TOPUP_LIST] ({table}, payload) {
    let data = payload.transactionList
    table.items = []
    data.forEach((item, index) => {
      table.items.push({
        num: (index + 1),
        date: moment(new Date(item.validUntil).getTime()).format('DD MMM \'YY hh:mm A'),
        name: item.senderName,
        no_hp: item.phoneNumber,
        bank_name: item.bankName,
        bank_account: item.bankAccountNumber,
        status: item.status,
        info: item.customerClaimedTransferred,
        data: item
      })
    })
  }
}
