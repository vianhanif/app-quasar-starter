import * as action from 'store/login/action-types'
import api from 'store/api'

export default {
  [action.AUTH_USER] ({commit}, {headers, data, success}) {
    let sha256 = require('js-sha256').sha256
    api.userLogin(
      headers,
      {
        username: data.username,
        password: sha256(`${data.username}${data.password}`)
      },
      response => {
        commit(action.SET_USER_IS_LOGIN)
        success(response.data)
      },
      response => {
        console.log(response)
      }
    )
  }
}
