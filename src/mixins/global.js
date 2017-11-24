import * as appAction from 'store/app/action-types'

export default {
  methods: {
    delimeter (number) {
      return number.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ' - ')
    },
    defaultDateFrom () {
      let moment = require('moment')
      let thisMonth = moment(new Date()).format('YYYY-MM')
      let _weekBeforeToday = new Date()
      _weekBeforeToday.setDate(_weekBeforeToday.getDate() - 7)
      let weekBeforeToday = moment(_weekBeforeToday).format('DD')
      return `${thisMonth}-${weekBeforeToday}`
    },
    defaultDateTo () {
      let moment = require('moment')
      let today = moment(new Date()).format('YYYY-MM-DD')
      return today
    },
    logout () {
      this.$session.destroy()
      this.$localStorage.remove('user')
      this.$store.commit(appAction.CLOSE_DRAWER)
      window.location.reload()
    }
  }
}
