/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-04-10 14:32:04 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-19 14:26:04
 */

const mongoose = require('mongoose')

const surveyRecordModel = mongoose.Schema({
    activityId: {
        require: true,
        type: String
    },
    surveyRecordArr: {
        require: true,
        type: Array
    }
})

module.exports = mongoose.model('surveyRecord', surveyRecordModel)