<template>
  <v-app :dark="appConfig.light" toolbar>
    <v-navigation-drawer class="white" persistent :mini-variant.sync="container.mini" v-model="container.drawer" v-if="$session.exists()">
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar class="white">
            <v-list-tile-avatar>
              <v-icon light style="margin-top:5px;font-size: 40px;transform:translate(0px, -3px);">person_pin</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text darken-4">{{$session.get('user')}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="container.drawer = !container.drawer">
                <v-icon class="grey--text darken-4">chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider class="grey lighten-2"></v-divider>
      <v-list class="pt-0 white" dense>
        <v-list-tile
          v-for="(item, index) in menus.filter((item, index) => { return index === 0})"
          :key="index"
          @click="handleMenu(item.route)">
          <v-list-tile-action>
            <v-icon class="indigo--text darken-2">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="indigo--text darken-2" v-if="$route.path.indexOf(item.route) === -1">{{ item.title }}</v-list-tile-title>
            <v-list-tile-title class="indigo--text darken-2" v-if="$route.path.indexOf(item.route) !== -1"><b>{{ item.title }}</b></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider class="grey lighten-2"></v-divider>
        <v-list-tile
          v-for="(item, index) in menus.filter((item, index) => { return index > 0})"
          :key="index"
          @click="handleMenu(item.route)">
          <v-list-tile-action>
            <v-icon class="green--text accent-3">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="green--text accent-3" v-if="$route.path.indexOf(item.route) === -1">{{ item.title }}</v-list-tile-title>
            <v-list-tile-title class="green--text accent-3" v-if="$route.path.indexOf(item.route) !== -1"><b>{{ item.title }}</b></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider class="grey lighten-2"></v-divider>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon :class="appConfig.light ? 'grey--text darken-3' : 'amber--text accent-2'" v-html="appConfig.light ? 'flash_off' : 'flash_on'"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-switch light class="amber--text accent-2" color="amber accent-4" label="Night Mode" v-model="appConfig.light" @click="handleLight" style="transform: translate(5px, -11px);"></v-switch>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="handleLogout()" v-if="$session.exists()">
          <v-list-tile-action>
            <v-icon class="deep-orange--text darken-1">exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="deep-orange--text darken-1">Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="green accent-3" light>
      <v-toolbar-side-icon @click.native.stop="handleDrawer" :disabled="!$session.exists()">
        <img style="margin-left: 2.3px;margin-bottom: 2px" :src="require('assets/app/mpay.svg')" v-if="!$session.exists()"/>
      </v-toolbar-side-icon>
      <v-toolbar-title>
        {{title}}
      </v-toolbar-title>
      <v-spacer v-if="container.right"/>
      <slot name="toolbar-menu"></slot>
    </v-toolbar>
    <main>
      <v-container fluid>
        <slot name="content"></slot>
      </v-container>
    </main>
  </v-app>
</template>
<script>
import {mapGetters} from 'vuex'
import * as appAction from 'store/app/action-types'
import Global from '@/mixins/global'

export default {
  name: 'AppDrawer',
  mixins: [Global],
  props: ['container', 'menus', 'title'],
  computed: {
    ...mapGetters({
      appConfig: appAction.GET_APP_CONFIG
    })
  },
  methods: {
    handleLogout () {
      this.logout()
    },
    handleDrawer () {
      if (this.container.drawer) {
        this.$store.commit(appAction.CLOSE_DRAWER)
      } else {
        this.container.mini = false
        this.$store.commit(appAction.OPEN_DRAWER)
      }
    },
    handleMenu (route) {
      this.$router.push(route)
    },
    handleLight (value) {
      this.$store.commit(appAction.SET_DARK_MODE)
    }
  },
  data () {
    return {
      light: false
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
