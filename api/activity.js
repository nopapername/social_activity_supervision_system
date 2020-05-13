/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-04-14 16:41:18 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-05-02 15:18:05
 */

const router = require('express').Router()
const fs = require('fs')
const multiparty = require('multiparty')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const activityModel = require('../dbModel/activityManager/activityModel')
const basicInfoModel = require('../dbModel/activityManager/basicInfoModel')
const planRegistrationModel = require('../dbModel/activityManager/planRegistrationModel')
const organizerModel = require('../dbModel/activityManager/organizerModel')
const surveyRecordModel = require('../dbModel/activityManager/surveyRecordModel')
const riskEstimatesAnalysisModel = require('../dbModel/activityManager/riskEstimatesAnalysisModel')
const caseSituationModel = require('../dbModel/activityManager/caseSituationModel')
const dataManagementModel = require('../dbModel/activityManager/dataManagementModel')
const workLogModel = require('../dbModel/activityManager/workLogModel')
const workSummaryModel = require('../dbModel/activityManager/workSummaryModel')


router.get('/getAllActivities', (req, res) => {
    activityModel.find().then((acts) => {
        if (!acts.length) {
            res.status(200).json({status: 200, res: '数据为空'})
        } else {
            res.status(200).json(acts)
        }
    }).catch((err) => {
        res.status(500).json({
            status: 500,
            result: '未知错误，获取失败'
        })
    })
})

router.post('/getBasicInformation', (req, res) => {
    basicInfoModel.findOne({
        activityId: req.body.activityId
    }).then((basicInfo) => {
        if (!basicInfo) {
            res.status(200).json({
                status: 200,
                res: '数据为空'
            })
        } else {
            res.status(200).json(basicInfo)
        }
    }).catch((err) => {
        res.status(500).json({
            status: 500,
            result: '未知错误，获取失败'
        })
    })
})

router.post('/saveActivity', async (req, res) => {
    let activity = req.body
    let id = uuidv4()
    const activityAll = new activityModel({
        activityId: id,
        activityName: activity.basicInformationData.activityName,
        jubanTimeStart: activity.basicInformationData.holdStart,
        jubanTimeEnd: activity.basicInformationData.holdEnd,
        activityType: activity.basicInformationData.nature,
        date: new Date()
    })
    await activityAll.save().then(() => {
        console.log('活动概览保存成功')
    }).catch((err) => {
        console.log('活动概览保存失败')
        res.status(500).json({
            status: 500,
            result: '活动信息提交失败'
        })
    })
    const basicInfoM = new basicInfoModel({
        activityId: id,
        activityName: activity.basicInformationData.activityName,
        zuzhiName: activity.basicInformationData.organizationalUnit,
        jubanTimeStart: activity.basicInformationData.holdStart,
        jubanTimeEnd: activity.basicInformationData.holdEnd,
        qinwuTimeStart: activity.basicInformationData.serviceStart,
        qinwuTimeEnd: activity.basicInformationData.serviceEnd,
        place: activity.basicInformationData.place,
        xingzhi: activity.basicInformationData.nature,
        guimo: activity.basicInformationData.extent,
        canyuPeopleNums: activity.basicInformationData.peopleNum,
        zerenMingJing: activity.basicInformationData.responsiblePolice,
        jingbanren: activity.basicInformationData.managerPeople
    })
    await basicInfoM.save().then(() => {
        console.log('活动基本信息保存成功')
    }).catch((err) => {
        console.log('活动基本信息保存失败')
        res.status(500).json({
            status: 500,
            result: '活动信息提交失败'
        })
    })
    const planRegistrationM = new planRegistrationModel({
        activityId: id,
        pictureName: activity.planRegistrationData.planImgForm.imgName,
        pictureDescripe: activity.planRegistrationData.planImgForm.imgContent,
        yuanName: activity.planRegistrationData.planFormItem.sitePlanName,
        huodongTime: activity.planRegistrationData.planFormItem.activityDuration,
        huodongPlace: activity.planRegistrationData.planFormItem.activityPlace,
        tijiaodanwei: activity.planRegistrationData.planFormItem.unitSubmittingPlan,
        zerenren: activity.planRegistrationData.planFormItem.personResponsible,
        chengbandanweiDetail: activity.planRegistrationData.planFormItem.undertakerDetails,
        yuanDetail: activity.planRegistrationData.planFormItem.detailedPlan,
        anquanYuan: activity.planRegistrationData.planFormItem.safetyPlan,
        jingjishudaofangan: activity.planRegistrationData.planFormItem.emergencyGroomingPlan,
        changdibushu: activity.planRegistrationData.planFormItem.siteDeployment,
        yuanzhidingPeople: activity.planRegistrationData.planFormItem.planner
    })
    await planRegistrationM.save().then(() => {
        console.log('预案登记信息保存成功')
    }).catch((err) => {
        console.log('预案登记信息保存失败')
        res.status(500).json({
            status: 500,
            result: '活动信息提交失败'
        })
    })
    const organizerM = new organizerModel({
        activityId: id,
        chengbandanwei: activity.organizerData.organizeName
    })
    await organizerM.save().then(() => {
        console.log('组织单位信息保存成功')
    }).catch((err) => {
        console.log('组织单位信息保存失败')
        res.status(500).json({
            status: 500,
            result: '活动信息提交失败'
        })
    })
    const surveyRecordM = new surveyRecordModel({
        activityId: id,
        surveyRecordArr: activity.surveyRecordData.surveyRecordForm.items
    })
    await surveyRecordM.save().then(() => {
        console.log('踏勘记录信息保存成功')
    }).catch((err) => {
        console.log('踏勘记录信息保存失败')
        res.status(500).json({
            status: 500,
            result: '活动信息提交失败'
        })
    })
    const riskEstimatesAnalysisM = new riskEstimatesAnalysisModel({
        activityId: id,
        riskEstimatesAnalysisData: activity.riskEstimatesAnalysisData
    })
    await riskEstimatesAnalysisM.save().then(() => {
        console.log('风险预估信息保存成功')
    }).catch((err) => {
        console.log('风险预估信息保存失败')
        res.status(500).json({
            status: 500,
            result: '活动信息提交失败'
        })
    })
    const caseSituationM = new caseSituationModel({
        activityId: id,
        caseSituationArr: activity.caseSituationData
    })
    await caseSituationM.save().then(() => {
        console.log('发案信息保存成功')
    }).catch((err) => {
        console.log('发案信息保存失败')
        res.status(500).json({
            status: 500,
            result: '活动信息提交失败'
        })
    })
    const dataManagementM = new dataManagementModel({
        activityId: id
    })
    await dataManagementM.save().then(() => {
        console.log('现场资料保存成功')
    }).catch((err) => {
        console.log('现场资料保存失败')
        res.status(500).json({
            status: 500,
            result: '活动信息提交失败'
        })
    })
    const workLogM = new workLogModel({
        activityId: id,
        workLogData: activity.workLogData
    })
    await workLogM.save().then(() => {
        console.log('工作日志保存成功')
    }).catch((err) => {
        console.log('工作日志保存失败')
        res.status(500).json({
            status: 500,
            result: '活动信息提交失败'
        })
    })
    const workSummaryM = new workSummaryModel({
        activityId: id,
        workSummaryData: activity.workSummaryData
    })
    workSummaryM.save().then(() => {
        console.log('工作总结保存成功')
        res.status(200).json({
            status: 200,
            result: '活动信息提交成功'
        })
    }).catch((err) => {
        console.log('工作总结保存失败')
        res.status(500).json({
            status: 500,
            result: '活动信息提交失败'
        })
    })
})

router.post('/saveBasicInformationFile', (req, res) => {
    //创建一个文件夹存放传递过来的文档
    let dirPath = './static/saveFile/basicInformation'
    //选择存放文件的文件夹
    let form = new multiparty.Form({
        uploadDir: dirPath
    })
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err)
            res.json({
                code: 500,
                msg: 'basicInformationFile上传失败'
            })
        }
        for (let i in files.file) {
            let fileInfo = files.file[i]
            // 将文件改名字
            let oldPath = path.resolve(__dirname, '../' + fileInfo.path)
            let newPath = path.resolve(__dirname, '../static/saveFile/basicInformation', fileInfo.originalFilename)
            fs.rename(oldPath, newPath, err => {
                if (err) {
                    throw err
                }
            })
        }
        res.json({
            code: 200,
            msg: 'basicInformationFile上传成功'
        })
    })
})
router.post('/savePlanRegistrationFile', (req, res) => {
    //创建一个文件夹存放传递过来的文档
    let dirPath = './static/saveFile/planRegistration'
    //选择存放文件的文件夹
    let form = new multiparty.Form({
        uploadDir: dirPath
    });
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err)
            res.json({
                code: 500,
                msg: 'planRegistrationFile上传失败'
            })
        }
        let fileInfo = files.file[0]
        // 将文件改名字
        let oldPath = path.resolve(__dirname, '../' + fileInfo.path)
        let newPath = path.resolve(__dirname, '../static/saveFile/planRegistration', fileInfo.originalFilename)
        fs.rename(oldPath, newPath, err => {
            if (err) {
                throw err
            }
        })
        res.json({
            code: 200,
            msg: 'planRegistrationFile上传成功'
        })
    })
})
router.post('/saveSurveyRecordFile', (req, res) => {
    //创建一个文件夹存放传递过来的文档
    let dirPath = './static/saveFile/surveyRecord'
    //选择存放文件的文件夹
    let form = new multiparty.Form({
        uploadDir: dirPath
    });
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err)
            res.json({
                code: 500,
                msg: 'surveyRecordFile上传失败'
            })
        }
        for (let i in files.file) {
            let fileInfo = files.file[i]
            // 将文件改名字
            let oldPath = path.resolve(__dirname, '../' + fileInfo.path)
            let newPath = path.resolve(__dirname, '../static/saveFile/surveyRecord', fileInfo.originalFilename)
            fs.rename(oldPath, newPath, err => {
                if (err) {
                    throw err
                }
            })
        }
        res.json({
            code: 200,
            msg: 'surveyRecordFile上传成功'
        })
    })
})
router.post('/saveDataManagementFile', (req, res) => {
    //创建一个文件夹存放传递过来的文档
    let dirPath = './static/saveFile/dataManagement'
    //选择存放文件的文件夹
    let form = new multiparty.Form({
        uploadDir: dirPath
    });
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err)
            res.json({
                code: 500,
                msg: 'dataManagementFile上传失败'
            })
        }
        for (let i in files.file) {
            let fileInfo = files.file[i]
            // 将文件改名字
            let oldPath = path.resolve(__dirname, '../' + fileInfo.path)
            let newPath = path.resolve(__dirname, '../static/saveFile/dataManagement', fileInfo.originalFilename)
            fs.rename(oldPath, newPath, err => {
                if (err) {
                    throw err
                }
            })
        }
        res.json({
            code: 200,
            msg: 'dataManagementFile上传成功'
        })
    })
})


module.exports = router