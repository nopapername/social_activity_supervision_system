/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-03-13 15:09:31 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-24 13:50:28
 */

const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const managersModel = mongoose.Schema({
    email: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String,
        set(val) {
            return bcrypt.hashSync(val, 10)
        }
    },
    date: {
        require: true,
        type: String
    },
    role: {
        require: true,
        type: String
    },
    authority: {
        require: true,
        type: String
    }
})

module.exports = mongoose.model('managers', managersModel)