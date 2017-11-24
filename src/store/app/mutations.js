import * as action from 'store/app/action-types'
import state from './state'

export default {
  [action.SET_DARK_MODE] ({app}) {
    app.light = !app.light
  },
  [action.OPEN_DRAWER] ({app}) {
    app.container.drawer = true
  },
  [action.CLOSE_DRAWER] ({app}) {
    app.container.drawer = false
  },
  [action.SHOW_ALERT] ({alert}, data) {
    alert.text = data.text
    if (typeof data.context !== 'undefined' && data.context !== null) {
      alert.context = data.context
    } else {
      alert.context = 'info'
    }
    alert.show = true
  },
  [action.CLOSE_ALERT] ({alert}) {
    alert.show = false
  },
  [action.START_SUBMIT_FORM] ({formProgress}) {
    formProgress.value = true
  },
  [action.STOP_SUBMIT_FORM] ({formProgress}) {
    formProgress.value = false
  },
  [action.SHOW_CONFIRM] ({confirm}, {title, text, handlerYes, handlerNo}) {
    confirm.open = true
    confirm.text = text
    if (typeof title !== 'undefined') {
      confirm.title = title
    } else {
      confirm.title = 'Konfirmasi!'
    }
    if (typeof handlerYes !== 'undefined') {
      confirm.handlerYes = handlerYes
    } else {
      confirm.handlerYes = () => {
        confirm.open = false
      }
    }
    if (typeof handlerNo !== 'undefined') {
      confirm.handlerNo = handlerNo
    } else {
      confirm.handlerNo = () => {
        confirm.open = false
      }
    }
  },
  [action.CLOSE_CONFIRM] ({confirm}) {
    confirm.open = false
  },
  [action.SHOW_DIALOG] ({dialog}, {title, text, handler}) {
    if (typeof title !== 'undefined' && title !== null) {
      dialog.title = title
    } else {
      dialog.title = 'Perhatian!'
    }
    dialog.text = text
    dialog.open = true
    if (typeof handler !== 'undefined' && handler !== null) {
      dialog.handler = handler
    } else {
      dialog.handler = () => {
        dialog.open = false
      }
    }
  },
  [action.CLOSE_DIALOG] ({dialog}) {
    dialog.open = false
  },
  [action.SHOW_SNACKBAR] ({snackbar}, data) {
    snackbar.text = data.text
    snackbar.context = data.context
    if (typeof data.handler !== 'undefined' && data.handler !== null) {
      snackbar.handler = data.handler
    } else {
      snackbar.handler = () => {
        snackbar.show = false
      }
    }
    if (typeof data.x !== 'undefined' && data.x !== null && data.x !== '') {
      snackbar.x = data.x
    } else {
      snackbar.x = state.snackbar.x
    }
    if (typeof data.y !== 'undefined' && data.y !== null && data.y !== '') {
      snackbar.y = data.y
    } else {
      snackbar.y = state.snackbar.y
    }
    snackbar.show = true
    setTimeout(() => {
      snackbar.show = false
    }, 3000)
  },
  [action.CLOSE_SNACKBAR] ({snackbar}) {
    snackbar.show = false
  }
}
