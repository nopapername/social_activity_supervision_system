/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-04-26 11:57:14 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-26 11:59:06
 */

const mongoose = require('mongoose')

const fanAnPeopleModel = mongoose.Schema({
    pName: {
        require: true,
        type: String
    },
    descripte: {
        require: true,
        type: Array
    },
    pNumber: {
        require: true,
        type: String
    },
    pAge: {
        require: true,
        type: String
    },
    pEventCount: {
        require: true,
        type: String
    },
    pTime: {
        require: true,
        type: String
    },
    pReason: {
        require: true,
        type: String
    },
    pIsGang: {
        require: true,
        type: String
    }
})

module.exports = mongoose.model('fanAnPeoples', fanAnPeopleModel)