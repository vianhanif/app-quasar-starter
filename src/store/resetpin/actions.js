import * as action from 'store/resetpin/action-types'
import * as appAction from 'store/app/action-types'
import api from 'store/api'

export default {
  [action.REQUEST_OTP] ({commit}, {headers, data, success, error}) {
    api.resetPin(
      headers,
      data,
      response => {
        success(response.data)
      },
      response => {
        error(response)
      }
    )
  },
  [action.LOAD_RESET_PIN_REQUEST_DATA] ({commit, state, rootGetters}, {success, error}) {
    if (state.dateFrom.value !== null && state.dateTo.value !== null) {
      const defaultData = {
        data: []
      }
      commit(appAction.START_SUBMIT_FORM)
      commit(action.LOAD_RESET_PIN_REQUEST_DATA, defaultData)
      api.loadResetData(
        rootGetters.GET_QUERY,
        {
          dateFrom: state.dateFrom.value,
          dateTo: state.dateTo.value
        },
        response => {
          if (response.data.responseStatus === 1) {
            if (response.data.data === null) {
              commit(action.LOAD_RESET_PIN_REQUEST_DATA, defaultData)
            } else {
              commit(action.LOAD_RESET_PIN_REQUEST_DATA, response.data)
            }
          } else {
            error(response)
          }
          commit(appAction.STOP_SUBMIT_FORM)
          success(response.data)
        },
        response => {
          commit(appAction.STOP_SUBMIT_FORM)
          error(response)
        }
      )
    }
  }
}
