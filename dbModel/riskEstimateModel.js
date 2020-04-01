/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-03-31 13:10:28 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-03-31 15:27:34
 */
const mongoose = require('mongoose')

const riskEstimateModel = mongoose.Schema({
    parentItem: {
        require: true,
        type: String
    },
    childItem: {
        require: true,
        type: String
    },
    opitionsAndFen: {
        require: true,
        type: Object
    }
})

module.exports = mongoose.model('riskEstimates', riskEstimateModel)