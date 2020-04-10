/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-04-10 14:32:04 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-10 14:54:27
 */

const mongoose = require('mongoose')

const basicInfoModel = mongoose.Schema({
    activityId: {
        require: true,
        type: String
    },
    activityName: {
        require: true,
        type: String
    },
    zuzhiName: {
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
    qinwuTimeStart: {
        require: true,
        type: String
    },
    qinwuTimeEnd: {
        require: true,
        type: String
    },
    place: {
        require: true,
        type: String
    },
    xingzhi: {
        require: true,
        type: String
    },
    guimo: {
        require: true,
        type: String
    },
    canyuPeopleNums: {
        require: true,
        type: String
    },
    zerenMingJing: {
        require: true,
        type: String
    },
    jingbanren: {
        require: true,
        type: String
    }
})

module.exports = mongoose.model('basicInfo', basicInfoModel)