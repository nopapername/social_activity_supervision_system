/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-04-10 14:32:04 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-19 14:37:18
 */

const mongoose = require('mongoose')

const riskEstimatesAnalysisModel = mongoose.Schema({
    activityId: {
        require: true,
        type: String
    },
    riskEstimatesAnalysisData: {
        require: true,
        type: Array
    }
})

module.exports = mongoose.model('riskEstimatesAnalysis', riskEstimatesAnalysisModel)