/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-04-25 17:30:50 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-25 17:31:16
 */



const mongoose = require('mongoose')

const qiYeManageModel = mongoose.Schema({
    qiYeName: {
        require: true,
        type: String
    },
    descripte: {
        require: true,
        type: String
    }
})

module.exports = mongoose.model('qiYeManages', qiYeManageModel)