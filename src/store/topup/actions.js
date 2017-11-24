import * as action from 'store/topup/action-types'
import * as appAction from 'store/app/action-types'
import api from 'store/api'

export default {
  [action.EXECUTE_TOPUP] ({commit, state, rootGetters}, {data, success, error}) {
    commit(appAction.SHOW_CONFIRM, {
      title: 'Konfirmasi!',
      text: 'Lakukan aksi topup ?',
      handlerYes () {
        commit(appAction.CLOSE_CONFIRM)
        if (data !== null) {
          commit(appAction.START_SUBMIT_FORM)
          api.executeTopup(
            rootGetters.GET_QUERY,
            {
              ...data,
              customerTransferred: true
            },
            response => {
              success(response.data)
              commit(appAction.STOP_SUBMIT_FORM)
              commit(appAction.SHOW_SNACKBAR, {
                context: (response.data.result.responseStatus === 1 ? 'success' : 'info'),
                text: response.data.result.responseMessage
              })
            },
            response => {
              error(response)
              commit(appAction.STOP_SUBMIT_FORM)
              commit(appAction.SHOW_SNACKBAR, {
                context: 'error',
                text: 'Connection Error'
              })
            }
          )
        }
      }
    })
  },
  [action.LOAD_TOPUP_LIST] ({commit, state, rootGetters}, {success, error}) {
    if (state.dateFrom.value !== null && state.dateTo.value !== null) {
      const defaultData = {
        transactionList: []
      }
      commit(appAction.START_SUBMIT_FORM)
      commit(action.LOAD_TOPUP_LIST, defaultData)
      api.loadTopupList(
        rootGetters.GET_QUERY,
        {
          dateFrom: state.dateFrom.value,
          dateTo: state.dateTo.value,
          moneyNotSent: false
        },
        response => {
          if (response.data.responseStatus === 1) {
            if (response.data.data === null) {
              commit(action.LOAD_TOPUP_LIST, defaultData)
            } else {
              commit(action.LOAD_TOPUP_LIST, response.data)
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
          commit(appAction.SHOW_SNACKBAR, {
            context: 'error',
            text: 'Connection Error'
          })
        }
      )
    }
  }
}
