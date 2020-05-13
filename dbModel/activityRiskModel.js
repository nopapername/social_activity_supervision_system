/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-04-22 15:26:27 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-22 16:08:46
 */

const mongoose = require('mongoose')

const activityRiskModel = mongoose.Schema({
    activityId: {
        require: true,
        type: String
    },
    activityName: {
        require: true,
        type: String
    },
    activityType: {
        require: true,
        type: Object
    },
    activitySelectRisk: {
        require: true,
        type: Array
    }
})

module.exports = mongoose.model('activityRisks', activityRiskModel)