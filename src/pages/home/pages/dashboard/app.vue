<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card-text class="text-xs-left header">
        Daftar Menu
      </v-card-text>
    </v-flex>
    <v-flex xs12 sm4 md3 lg2 v-for="(item, index) in menus" :key="index">
      <v-card class="mt-5 lighten-4 elevation-4 card" @click="handleMenu(item.route)">
        <v-card-text class="text-xs-center">
          <div class="">
            <v-icon class="icon">{{item.icon}}</v-icon>
          </div>
          <span class="title">{{item.title}}</span>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import config from '@/config'

export default {
  name: 'Dashboard',
  created () {
  },
  methods: {
    handleMenu (route) {
      this.$router.push(route)
    }
  },
  data () {
    return {
      menus: config.toolbar.filter((item, index) => { return index > 0 })
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  font-size: 30px;
}
.card {
  margin: 10px;
  margin-top: 10px !important;
  cursor: pointer;
}
.icon {
  font-size: 50px;
  margin-bottom: 10px;
}
.title {
  font-size: 45px;
}
</style>
