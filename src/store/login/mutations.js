import * as action from 'store/login/action-types'

export default {
  [action.SET_USERNAME] ({username}, value) {
    username.value = value
  },
  [action.SET_PASSWORD] ({password}, value) {
    password.value = value
  },
  [action.SET_USER_IS_LOGIN] ({status}) {
    status.loged = true
  }
}
