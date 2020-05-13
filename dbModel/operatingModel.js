/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-04-24 13:59:02 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-24 14:13:48
 */

const mongoose = require('mongoose')

const operatingModel = mongoose.Schema({
    email: {
        require: true,
        type: String
    },
    role: {
        require: true,
        type: String
    },
    operate: {
        require: true,
        type: String
    },
    date: {
        require: true,
        type: String
    }
})

module.exports = mongoose.model('operatings', operatingModel)