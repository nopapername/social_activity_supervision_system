/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-04-25 15:50:20 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-25 15:51:21
 */


const mongoose = require('mongoose')

const placeImModel = mongoose.Schema({
    placeName: {
        require: true,
        type: String
    },
    descripte: {
        require: true,
        type: String
    }
})

module.exports = mongoose.model('placeIms', placeImModel)