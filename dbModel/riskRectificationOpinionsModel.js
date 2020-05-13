/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-04-23 15:22:38 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-23 15:25:06
 */

const mongoose = require('mongoose')

const riskRectificationOpinionsModel = mongoose.Schema({
    activityId: {
        require: true,
        type: String
    },
    activityName: {
        require: true,
        type: String
    },
    activityPlace: {
        require: true,
        type: String
    },
    planName: {
        require: true,
        type: String
    },
    zhengGaiOpinion: {
        require: true,
        type: String
    },
    opinionDetail: {
        require: true,
        type: String
    },
    zhuangTai: {
        require: true,
        type: String
    },
    caoZuo: {
        require: true,
        type: String
    }
})

module.exports = mongoose.model('riskRectificationOpinions', riskRectificationOpinionsModel)