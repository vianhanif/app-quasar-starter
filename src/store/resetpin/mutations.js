import * as action from 'store/resetpin/action-types'
import moment from 'moment'

export default {
  [action.SET_DATE_FROM] ({dateFrom}, value) {
    dateFrom.value = value
  },
  [action.SET_DATE_TO] ({dateTo}, value) {
    dateTo.value = value
  },
  [action.SET_PHONENUMBER] ({phonenumber}, value) {
    phonenumber.value = value
  },
  [action.SET_OSTICKET] ({osticket}, value) {
    osticket.value = value
  },
  [action.SEARCH_DATA_RESET_PIN] ({table}, value) {
    table.search = value
  },
  [action.LOAD_RESET_PIN_REQUEST_DATA] ({table}, payload) {
    let data = payload.data.reverse()
    console.log(data)
    table.items = []
    data.forEach((item, index) => {
      let otpSent = item.otpCreated !== null
      let isValidated = item.isvalidated
      let expiredDate = moment(new Date(item.otpValidUntil).getTime()).format('DD MMM \'YY hh:mm A')
      let ticketDate = moment(new Date(item.otpCreated).getTime()).format('DD MMM \'YY hh:mm A')
      console.log(item.ticketCreated)
      table.items.push({
        num: (index + 1),
        date: ticketDate,
        os_ticket: `${item.ticketNumber}`,
        no_hp: item.handphoneNumber,
        status: (isValidated ? 'Tervalidasi' : '---'),
        otpExpired: (otpSent ? expiredDate : '---'),
        info: (isValidated ? 1 : 0)
      })
    })
  }
}
