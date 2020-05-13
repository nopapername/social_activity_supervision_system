import Vue from 'vue'
import Vuex from 'vuex'
import adminStore from './adminStore'
import activityWriteStore from './activityWriteStore'
import activitiesManagerStore from './activitiesManagerStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    thisTab: 0,
    dictionaryObj: {}
  },
  getters: {
    thisTab: state => state.thisTab,
    dictionaryObj: state => state.dictionaryObj
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
    },
    setDictionaryObj: (state, dictionaryObj) => {
      state.dictionaryObj = dictionaryObj
    }
  },
  actions: {
    setDictionaryObj: ({
      commit
    }) => {
      Vue.prototype.axios.get('http://localhost:3000/api/admin/getAllDictionary').then(res => {
        commit('setDictionaryObj', res.data[0].dictionary)
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  modules: {
    adminStore,
    activityWriteStore,
    activitiesManagerStore
  }
})
