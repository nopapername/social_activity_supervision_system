/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-03-13 16:24:13 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-03-18 12:12:15
 */

const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const usersModel = mongoose.Schema({
    email: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String,
        set (val) {
            return bcrypt.hashSync(val, 10)
        }
    },
    startTime:{
        require: true,
        type: String
    },
    endTime:{
        require: true,
        type: String
    }
})

module.exports =  mongoose.model('users', usersModel)