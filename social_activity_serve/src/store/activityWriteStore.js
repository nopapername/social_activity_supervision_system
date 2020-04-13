/*
 * @Author: Mr_Oyjh
 * @Date: 2020-04-13 13:41:52
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-13 15:11:16
 */

const state = {
  activity: {
    basicInformationData: {},
    planRegistrationData: {},
    organizerData: {},
    surveyRecordData: {},
    riskEstimatesAnalysisData: {},
    caseSituationData: {},
    dataManagementData: {},
    workLogData: {},
    workSummaryData: {}
  }
}
const getters = {
  activity: state => state.activity
}
const mutations = {
  setBasicInformation: (state, basicInformation) => {
    state.activity.basicInformationData = basicInformation
  },
  setPlanRegistration: (state, planRegistration) => {
    state.activity.planRegistrationData = planRegistration
  },
  setOrganizer: (state, organizer) => {
    state.activity.organizerData = organizer
  },
  setSurveyRecord: (state, surveyRecord) => {
    state.activity.surveyRecordData = surveyRecord
  },
  setRiskEstimatesAnalysis: (state, riskEstimatesAnalysis) => {
    state.activity.riskEstimatesAnalysisData = riskEstimatesAnalysis
  },
  setCaseSituation: (state, caseSituation) => {
    state.activity.caseSituationData = caseSituation
  },
  setDataManagement: (state, dataManagement) => {
    state.activity.dataManagementData = dataManagement
  },
  setWorkLog: (state, workLog) => {
    state.activity.workLogData = workLog
  },
  setWorkSummary: (state, workSummary) => {
    state.activity.workSummaryData = workSummary
  }
}
const actions = {
  setBasicInformation: ({
    commit
  }, basicInformation) => {
    commit('setBasicInformation', basicInformation)
  },
  setPlanRegistration: ({
    commit
  }, planRegistration) => {
    commit('setPlanRegistration', planRegistration)
  },
  setOrganizer: ({
    commit
  }, organizer) => {
    commit('setOrganizer', organizer)
  },
  setSurveyRecord: ({
    commit
  }, surveyRecord) => {
    commit('setSurveyRecord', surveyRecord)
  },
  setRiskEstimatesAnalysis: ({
    commit
  }, riskEstimatesAnalysis) => {
    commit('setRiskEstimatesAnalysis', riskEstimatesAnalysis)
  },
  setCaseSituation: ({
    commit
  }, caseSituation) => {
    commit('setCaseSituation', caseSituation)
  },
  setDataManagement: ({
    commit
  }, dataManagement) => {
    commit('setDataManagement', dataManagement)
  },
  setWorkLog: ({
    commit
  }, workLog) => {
    commit('setWorkLog', workLog)
  },
  setWorkSummary: ({
    commit
  }, workSummary) => {
    commit('setWorkSummary', workSummary)
  }
}

const activityWriteStore = {
  state,
  getters,
  mutations,
  actions
}

export default activityWriteStore
