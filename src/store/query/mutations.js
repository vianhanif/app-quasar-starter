import * as action from './action-types'

export default {
  [action.SET_QUERY] (state, query) {
    state.userId.value = parseInt(query.userId) || ''
    state.agentId.value = parseInt(query.agentId) || ''
    state.email.value = query.email || ''
    state.securityKey.value = query.securityKey || ''
    state.customerId.value = parseInt(query.customerId) || ''
    state.pocket.value = query.pocket || ''
    state.phoneNo.value = query.phoneNo || ''
    state.version.value = parseInt(query.version) || ''
    state.deviceId.value = query.deviceId || ''
    state.token.value = query.token || ''
    if (typeof query.openUpdatePage !== 'undefined') {
      state.openUpdatePage.value = parseInt(query.openUpdatePage) || 0
    }
  },
  [action.CLOSE_FORM_UPDATE_DATA] ({openUpdatePage}) {
    openUpdatePage.value = 0
  }
}
