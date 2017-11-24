import * as action from './action-types'

export default {
  [action.GET_QUERY] (state) {
    return {
      userId: state.userId.value,
      agentId: state.agentId.value,
      email: state.email.value,
      securityKey: state.securityKey.value,
      customerId: state.customerId.value,
      pocket: state.pocket.value,
      phoneNo: state.phoneNo.value,
      version: state.version.value,
      deviceId: state.deviceId.value,
      token: state.token.value,
      openUpdatePage: state.openUpdatePage.value
    }
  }
}
