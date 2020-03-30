/*
 * @Author: Mr_Oyjh
 * @Date: 2020-03-15 16:04:00
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-03-15 16:16:58
 */

const state = {
  adminInfo: [],
  isAdminAuthorization: false
}
const getters = {
  isAdminAuthorization: state => state.isAdminAuthorization,
  adminInfo: state => state.adminInfo
}
const mutations = {
  setAdminAuthorization: (state, authorization) => {
    state.isAdminAuthorization = authorization
  },
  setAdminInfo: (state, info) => {
    state.adminInfo = info
  }
}
const actions = {
  setAdminAuthorization: ({
    commit
  }, authorization) => {
    commit('setAdminAuthorization', authorization)
  },
  setAdminInfo: ({
    commit
  }, info) => {
    commit('setAdminInfo', info)
  },
  clearAdminAuthorization: ({
    commit
  }) => {
    localStorage.removeItem('adminToken')
    commit('setAdminAuthorization', false)
  }
}

const adminStore = {
  state,
  getters,
  mutations,
  actions
}

export default adminStore
