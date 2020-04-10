/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-04-10 14:32:04 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-10 15:01:27
 */

const mongoose = require('mongoose')

const planRegistrationModel = mongoose.Schema({
    activityId: {
        require: true,
        type: String
    },
    pictureName: {
        require: true,
        type: String
    },
    pictureDescripe: {
        require: true,
        type: String
    },
    yuanName: {
        require: true,
        type: String
    },
    huodongTime: {
        require: true,
        type: String
    },
    huodongPlace: {
        require: true,
        type: String
    },
    tijiaodanwei: {
        require: true,
        type: String
    },
    zerenren: {
        require: true,
        type: String
    },
    chengbandanweiDetail: {
        require: true,
        type: String
    },
    yuanDetail: {
        require: true,
        type: String
    },
    anquanYuan: {
        require: true,
        type: String
    },
    jingjishudaofangan: {
        require: true,
        type: String
    },
    changdibushu: {
        require: true,
        type: String
    }
    ,
    yuanzhidingPeople: {
        require: true,
        type: String
    }
})

module.exports = mongoose.model('planRegistration', planRegistrationModel)