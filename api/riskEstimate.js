/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-03-31 13:09:41 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-03-31 23:35:18
 */

const router = require('express').Router()
const riskEstimates = require('../dbModel/riskEstimateModel')

router.post('/saveRiskEstimate', (req, res) => {
    var parentItem = req.body.parentItem
    var childItem = req.body.childItem
    var opitionsAndFen = req.body.opitionsAndFen
    const newRiskEstimates = new riskEstimates({
        parentItem,
        childItem,
        opitionsAndFen
    })
    newRiskEstimates.save().then(() => {
        res.status(200).json({
            status: 200,
            result: '保存成功'
        })
    }).catch((err) => {
        res.status(500).json({
            status: 500,
            result: '未知错误，保存失败'
        })
    })
})

router.get('/getRiskEstimate', (req, res) => {
    riskEstimates.find().then((riskE) => {
        riskE.length ? res.send(riskE) : res.json({
            status: 200,
            result: "数据为空"
        })
    }).catch((err) => {
        res.status(500).json({
            status: 500,
            result: '未知错误，获取失败'
        })
    })
})

router.post('/deleteRiskEstimate', (req, res) => {
    var deleteDataArr = req.body
    deleteDataArr.forEach((item) => {
        riskEstimates.findByIdAndRemove(item._id).then(result => {
            res.status(200).json({status: 200, result: '删除成功'})
        })
    })
})

module.exports = router