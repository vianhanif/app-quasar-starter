// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.config.base with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueHead from 'vue-head'
import VueSession from 'vue-session'
import VueLocalStorage from 'vue-localstorage'
// import App from './App'
import router from './router'
import store from './store'
import Quasar from 'quasar'

import 'vuetify/dist/vuetify.min.css'
import 'vuetify/dist/vuetify.min.js'

Vue.use(VueSession)
Vue.use(VueLocalStorage, {
  name: 'localStorage',
  createComputed: true
})
Vue.use(Vuetify)
Vue.use(VueHead, {
  separator: '',
  complement: ''
})

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.config.debug = true

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   store,
//   router,
//   template: '<App/>',
//   components: { App }
// })

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    store,
    router,
    render: h => h(require('./App').default)
  })
})
