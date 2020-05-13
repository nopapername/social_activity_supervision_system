/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-03-13 16:24:13 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-23 18:07:06
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
    }
})

module.exports =  mongoose.model('users', usersModel)