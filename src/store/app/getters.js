import * as action from 'store/app/action-types'

export default {
  [action.GET_APP_CONFIG] ({app}) {
    return app
  },
  [action.GET_APP_CONFIRM] ({confirm}) {
    return confirm
  },
  [action.GET_APP_DIALOG] ({dialog}) {
    return dialog
  },
  [action.GET_APP_SNACKBAR] ({snackbar}) {
    return snackbar
  },
  [action.GET_FORM_PROGRESS] ({formProgress}) {
    return formProgress.value
  },
  [action.GET_APP_ALERT] ({alert}) {
    return alert
  }
}
