/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-04-10 14:32:04 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-10 15:03:21
 */

const mongoose = require('mongoose')

const organizerModel = mongoose.Schema({
    activityId: {
        require: true,
        type: String
    },
    chengbandanwei: {
        require: true,
        type: String
    }
})

module.exports = mongoose.model('organizer', organizerModel)