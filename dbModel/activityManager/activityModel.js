/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-04-10 14:32:04 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-10 14:35:01
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
    data: {
        require: true,
        type: String
    }
})

module.exports = mongoose.model('activity', activityModel)