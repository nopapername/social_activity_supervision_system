/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-04-25 15:52:45 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-26 12:07:28
 */
const router = require('express').Router()

const PlaceIms = require('../dbModel/placeImModel')
const QiYeManages = require('../dbModel/qiYeManageModel')
const FanAnPeoples = require('../dbModel/fanAnPeopleModel')

router.get('/getAllPlaceIm', (req, res) => {
    PlaceIms.find().then((placeIms) => {
        placeIms.length ? res.send(placeIms) : res.json({
            status: 200,
            result: "数据为空"
        })
    }).catch((err) => {
        res.status(500).json({
            status: 500,
            result: '未知错误，重点场所获取失败'
        })
    })
})

router.post('/addPlaceIm', (req, res) => {
    let placeName = req.body.placeName
    let descripte = req.body.descripte
    const newPlaceIms = new PlaceIms({
        placeName,
        descripte
    })
    newPlaceIms.save().then(() => {
        res.json({
            status: "200",
            result: '重点场所已添加'
        })
    }).catch(err => {
        res.status(500).json({
            status: "500",
            result: "未知错误,重点场所添加失败"
        })
    })
})

router.post('/removePlaceIm', (req, res) => {
    let _id = req.body._id
    PlaceIms.findByIdAndRemove({
        _id
    }).then(() => {
        console.log("重点场所记录删除成功");
        res.status(200).json({
            status: "200",
            result: "重点场所删除成功"
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            status: "500",
            result: "重点场所删除失败,未知错误",
            err: err
        })
    })
})

router.get('/getAllQiYe', (req, res) => {
    QiYeManages.find().then((qiYeManages) => {
        qiYeManages.length ? res.send(qiYeManages) : res.json({
            status: 200,
            result: "数据为空"
        })
    }).catch((err) => {
        res.status(500).json({
            status: 500,
            result: '未知错误，企业获取失败'
        })
    })
})

router.post('/addQiYe', (req, res) => {
    let qiYeName = req.body.qiYeName
    let descripte = req.body.descripte
    const newQiYeManages = new QiYeManages({
        qiYeName,
        descripte
    })
    newQiYeManages.save().then(() => {
        res.json({
            status: "200",
            result: '企业已添加'
        })
    }).catch(err => {
        res.status(500).json({
            status: "500",
            result: "未知错误,企业添加失败"
        })
    })
})

router.post('/removeQiYe', (req, res) => {
    let _id = req.body._id
    QiYeManages.findByIdAndRemove({
        _id
    }).then(() => {
        console.log("企业删除成功");
        res.status(200).json({
            status: "200",
            result: "企业删除成功"
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            status: "500",
            result: "企业删除失败,未知错误",
            err: err
        })
    })
})

router.get('/getAllFanAnPeople', (req, res) => {
    FanAnPeoples.find().then((fanAnPeoples) => {
        fanAnPeoples.length ? res.send(fanAnPeoples) : res.json({
            status: 200,
            result: "数据为空"
        })
    }).catch((err) => {
        res.status(500).json({
            status: 500,
            result: '未知错误，犯案人员获取失败'
        })
    })
})

router.post('/addFanAnPeople', (req, res) => {
    let pName = req.body.pName,
        descripte = req.body.descripte,
        pNumber = req.body.pNumber,
        pAge = req.body.pAge,
        pEventCount = req.body.pEventCount,
        pTime = req.body.pTime,
        pReason = req.body.pReason,
        pIsGang = req.body.pIsGang
    const newFanAnPeoples = new FanAnPeoples({
        pName,
        descripte,
        pNumber,
        pAge,
        pEventCount,
        pTime,
        pReason,
        pIsGang
    })
    newFanAnPeoples.save().then(() => {
        res.json({
            status: "200",
            result: '犯案人员已添加'
        })
    }).catch(err => {
        res.status(500).json({
            status: "500",
            result: "未知错误,犯案人员添加失败"
        })
    })
})

router.post('/removeFanAnPeople', (req, res) => {
    let _id = req.body._id
    FanAnPeoples.findByIdAndRemove({
        _id
    }).then(() => {
        console.log("犯案人员删除成功");
        res.status(200).json({
            status: "200",
            result: "犯案人员删除成功"
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            status: "500",
            result: "犯案人员删除失败,未知错误",
            err: err
        })
    })
})

module.exports = router