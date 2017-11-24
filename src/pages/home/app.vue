<template>
  <app-drawer
    :title="$route.name"
    :menus="$session.exists() ? appConfig.menus : []"
    :container='appConfig.container'
    >
    <toolbar-menu slot="toolbar-menu"/>
    <div slot="content">
      <v-layout row wrap>
        <v-flex xs12 offset-xs0 sm10 offset-sm1 md6 offset-md3>
          <alert
            :text="appAlert.text"
            :context="appAlert.context"
            :show="appAlert.show"
          />
        </v-flex>
      </v-layout>
      <router-view></router-view>
      <standard-dialog
        :open="appDialog.open"
        :title="appDialog.title"
        :text="appDialog.text"
        :handler="appDialog.handler"
      />
      <confirm-dialog
        :open="appConfirm.open"
        :title="appConfirm.title"
        :text="appConfirm.text"
        :handlerYes="appConfirm.handlerYes"
        :handlerNo="appConfirm.handlerNo"
      />
      <snackbar
        :show="appSnackbar.show"
        :text="appSnackbar.text"
        :context="appSnackbar.context"
        :x="appSnackbar.x"
        :y="appSnackbar.y"
        :handler="appSnackbar.handler"
      />
    </div>
  </app-drawer>
</template>
<script>
import AppDrawer from 'components/AppDrawer/app'
import StandardDialog from 'page/home/components/Dialog/app'
import ConfirmDialog from 'page/home/components/Confirm/app'
import Snackbar from 'components/Snackbar/app'
import Alert from 'components/Alert/app'
import Toolbar from 'page/home/components/ToolbarMenu/app'
import {mapGetters} from 'vuex'
import * as appAction from 'store/app/action-types'

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      appConfig: appAction.GET_APP_CONFIG,
      appDialog: appAction.GET_APP_DIALOG,
      appConfirm: appAction.GET_APP_CONFIRM,
      appSnackbar: appAction.GET_APP_SNACKBAR,
      appAlert: appAction.GET_APP_ALERT
    })
  },
  updated () {
    if (!this.$session.exists()) {
      this.$router.replace('/home/login')
    } else {
      if (this.$route.path.indexOf('login') !== -1) {
        this.$router.replace('/home/dashboard')
      }
    }
  },
  components: {
    'app-drawer': AppDrawer,
    'standard-dialog': StandardDialog,
    'confirm-dialog': ConfirmDialog,
    'snackbar': Snackbar,
    'alert': Alert,
    'toolbar-menu': Toolbar
  }
}
</script>
<style lang="scss" scoped>
</style>
