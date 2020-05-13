/*
 * @Author: Mr_Oyjh
 * @Date: 2020-04-21 16:21:18
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-22 16:57:32
 */
import Vue from 'vue'

const state = {
  activities: [],
  activityRisk: []
}
const getters = {
  activities: state => state.activities,
  activityRisk: state => state.activityRisk
}
const mutations = {
  setActivities: (state, activities) => {
    state.activities = activities
  },
  setActivityRisk: (state, activityRiskObj) => {
    const index = state.activityRisk.findIndex((item) => item.activityId === activityRiskObj.activityId)
    if (index !== -1) {
      state.activityRisk[index] = activityRiskObj
    } else {
      state.activityRisk.push(activityRiskObj)
    }
  },
  clearActivityRisk: (state) => {
    state.activityRisk = []
  }
}
const actions = {
  setActivities: ({
    commit
  }, activities) => {
    commit('setActivities', activities)
  },
  setActivityRisk: ({
    commit
  }, activityRiskObj) => {
    commit('setActivityRisk', activityRiskObj)
  },
  setActivityRiskFen: ({
    state
  }, activityRiskFen) => {
    state.activityRisk[activityRiskFen.index].activitySelectRisk.forEach((item) => {
      for (let i = 0; i < activityRiskFen.data.length; i++) {
        if (item.factor === activityRiskFen.data[i].parentItem && item.name === activityRiskFen.data[i].childItem) {
          item.selectFen = activityRiskFen.data[i].selectFen
          break
        }
      }
    })
    Vue.prototype.axios.post('http://localhost:3000/api/riskEstimate/saveActivityRisk', state.activityRisk[activityRiskFen.index]).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
}

const activitiesManagerStore = {
  state,
  getters,
  mutations,
  actions
}

export default activitiesManagerStore
