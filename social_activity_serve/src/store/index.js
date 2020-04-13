import Vue from 'vue'
import Vuex from 'vuex'
import adminStore from './adminStore'
import activityWriteStore from './activityWriteStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    thisTab: 0
  },
  getters: {
    thisTab: state => state.thisTab
  },
  mutations: {
    selectTab (state, name) {
      state.thisTab = name
    },
    nextStep (state) {
      state.thisTab += 1
    },
    preStep (state) {
      state.thisTab -= 1
    }
  },
  actions: {
  },
  modules: {
    adminStore,
    activityWriteStore
  }
})
