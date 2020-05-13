/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-04-24 17:59:21 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-24 18:00:57
 */

const mongoose = require('mongoose')

const dictionaryModel = mongoose.Schema({
    dictionary: {
        require: true,
        type: Object
    }
})

module.exports = mongoose.model('dictionarys', dictionaryModel)