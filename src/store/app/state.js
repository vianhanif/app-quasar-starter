import config from '@/config'
import moment from 'moment'

const isNight = () => {
  let time = moment(new Date().getTime()).format('HH')
  return Number(time) >= 18
}

export default {
  app: {
    light: isNight(),
    menus: config.toolbar,
    container: {
      useDrawer: true,
      drawer: true,
      mini: false,
      right: true
    }
  },
  confirm: {
    open: false,
    title: '',
    text: '',
    handlerYes: null,
    handlerNo: null
  },
  dialog: {
    open: false,
    title: '',
    text: '',
    handler: null
  },
  snackbar: {
    show: false,
    x: 'center',
    y: 'top',
    context: '',
    text: '',
    handler: null
  },
  formProgress: {
    value: false
  },
  alert: {
    text: '',
    context: 'info',
    show: false
  }
}
