/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-04-10 14:32:04 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-19 14:25:49
 */

const mongoose = require('mongoose')

const workLogModel = mongoose.Schema({
    activityId: {
        require: true,
        type: String
    },
    workLogData: {
        require: true,
        type: Array
    }
})

module.exports = mongoose.model('workLog', workLogModel)