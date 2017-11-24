import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import login from './login'
import query from './query'
import topup from './topup'
import resetpin from './resetpin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    login,
    resetpin,
    topup,
    query
  }
})
