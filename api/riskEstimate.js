/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-03-31 13:09:41 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-26 15:15:50
 */

const router = require('express').Router()
const riskEstimates = require('../dbModel/riskEstimateModel')
const activityRisks = require('../dbModel/activityRiskModel')
const riskRectificationOpinions = require('../dbModel/riskRectificationOpinionsModel')

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

router.post('/getActivityOneRiskEstimate', (req, res) => {
    activityRisks.findOne({
        activityId: req.body.activityId
    }).then((ariskE) => {
        if (!ariskE) {
            res.status(200).json({
                status: 200,
                res: '数据为空'
            })
        } else {
            res.status(200).json(ariskE)
        }
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

router.post('/saveActivityRisk', (req, res) => {
    let activityId = req.body.activityId
    let activityName = req.body.activityName
    let activityType = req.body.activityType
    let activitySelectRisk = req.body.activitySelectRisk
    activityRisks.findOne({activityId}).then((actRisk) => {
        if (!actRisk) {
            const newActivityRisks = new activityRisks({
                activityId,
                activityName,
                activityType,
                activitySelectRisk
            })
            newActivityRisks.save().then(() => {
                res.status(200).json({
                    status: 200,
                    result: '保存成功'
                })
            }).catch((err) => {
                console.log(err)
                res.status(500).json({
                    status: 500,
                    result: '未知错误，保存失败'
                })
            })
        } else {
            activityRisks.findOneAndUpdate({ activityId }, { $set: { activitySelectRisk: activitySelectRisk } }, {new: true}).then(aRisks => {
                aRisks.save()
                    .then(() => {
                        console.log("活动预估项更新成功");
                        res.status(200).json({
                            status: "200",
                            result: "活动预估项更新成功"
                        })
                    }).catch(err => {
                        console.log(err)
                        res.status(500).json({
                            status: "500",
                            result: "更新失败,未知错误"
                        })
                    })
            })
        }
    }).catch((err) => {
        res.status(500).json({
            status: 500,
            result: '未知错误，获取失败'
        })
    })
})

router.get('/getActivityRisk', (req, res) => {
    activityRisks.find().then((aR) => {
        aR.length ? res.send(aR) : res.json({
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

router.post('/addRiskRectificationOpinions', (req, res) => {
    let activityId = req.body.activityId,
        activityName = req.body.activityName,
        activityPlace = req.body.activityPlace,
        planName = req.body.planName,
        zhengGaiOpinion = req.body.zhengGaiOpinion,
        opinionDetail = req.body.opinionDetail,
        zhuangTai = req.body.zhuangTai,
        caoZuo = req.body.caoZuo
    const newRiskRectificationOpinions = new riskRectificationOpinions({
        activityId,
        activityName,
        activityPlace,
        planName,
        zhengGaiOpinion,
        opinionDetail,
        zhuangTai,
        caoZuo
    })
    newRiskRectificationOpinions.save().then(() => {
        res.status(200).json({
            status: 200,
            result: '整改意见添加成功'
        })
    }).catch((err) => {
        res.status(500).json({
            status: 500,
            result: '未知错误，整改意见添加失败'
        })
    })
})

router.post('/updateRiskRectificationOpinions', (req, res) => {
    let activityId = req.body.activityId,
        activityPlace = req.body.activityPlace,
        planName = req.body.planName,
        zhengGaiOpinion = req.body.zhengGaiOpinion,
        opinionDetail = req.body.opinionDetail,
        zhuangTai = req.body.zhuangTai,
        caoZuo = req.body.caoZuo
    riskRectificationOpinions.findOneAndUpdate({
        activityId
    }, {
        $set: {
            activityPlace: activityPlace,
            planName: planName,
            zhengGaiOpinion: zhengGaiOpinion,
            opinionDetail: opinionDetail,
            zhuangTai: zhuangTai,
            caoZuo: caoZuo
        }
    }, {
        new: true
    }).then(ureo => {
    ureo.save()
        .then(() => {
            console.log("整改意见更新成功");
            res.status(200).json({
                status: "200",
                result: "整改意见更新成功"
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                status: "500",
                result: "更新失败,未知错误"
            })
        })
    })
})

router.get('/getRiskRectificationOpinions', (req, res) => {
    riskRectificationOpinions.find().then((rro) => {
        rro.length ? res.send(rro) : res.json({
            status: 200,
            result: "数据为空"
        })
    }).catch((err) => {
        res.status(500).json({
            status: 500,
            result: '未知错误，整改意见列表获取失败'
        })
    })
})

module.exports = router