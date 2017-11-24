import * as action from 'store/login/action-types'

export default {
  [action.LOGIN_DATA] (state) {
    return {
      username: state.username.value,
      password: state.password.value,
      status: state.status
    }
  },
  [action.READY_TO_SUBMIT_LOGIN] (state) {
    // let isEmailValid = (text) => {
    //   let tester = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //   return tester.test(text)
    // }
    let {username, password} = state
    return username.value !== null &&
      username.value !== '' &&
      username.value !== '' &&
      password.value !== null &&
      password.value !== ''
  }
}
