/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-04-10 14:32:04 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-25 12:05:18
 */

const mongoose = require('mongoose')

const activityModel = mongoose.Schema({
    activityId: {
        require: true,
        type: String
    },
    activityName: {
        require: true,
        type: String
    },
    jubanTimeStart: {
        require: true,
        type: String
    },
    jubanTimeEnd: {
        require: true,
        type: String
    },
    activityType: {
        require: true,
        type: String
    },
    date: {
        require: true,
        type: String
    }
})

module.exports = mongoose.model('activity', activityModel)