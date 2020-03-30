/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-03-13 17:04:18 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-03-18 18:13:09
 */

const router = require('express').Router()
const bcrypt = require("bcrypt") // 加密解密
const jwt = require("jsonwebtoken")
const jwt_key = require("../linkSecret/jwtKey").secretKey
const passport = require("passport")
require("../config/date")
// 数据库模型
const Managers = require('../dbModel/managers')

router.post('/login', (req, res) => {
    const email = req.body.email
    Managers.findOne({email}).then(manager => {
        if (!manager) {
            return res.status(406).json({status: 406, result: '管理员不存在'})
        } else {
            const password = req.body.password
            let isValidPassword = bcrypt.compareSync(password, manager.password)
            if (!isValidPassword) {
                return res.status(406).json({status: 406, result: '用户名或密码错误'})
            } else {
                const rule = {
                    id: String(manager._id),
                    email: manager.email,
                    date: manager.date
                }
                jwt.sign(rule, jwt_key, {expiresIn: 60 * 60}, (err, token) => {
                    if (err) {
                        return res.status(500).json({status: 500, result: '未知错误'})
                    } else {
                        return res.status(200).json({
                            status: 200,
                            result: '登陆成功',
                            token: "Bearer " + token
                        })
                    }
                })
            }
        }
    })
    
})
router.post('/register', (req, res) => {
    const email = req.body.registerEmail
    Managers.findOne({email}).then((manager) => {
        if (manager) {
        return res.status(422).json({status: 422, result: '注册邮箱已被注册'})
        } else {
            const password = req.body.registerPassword
            const date = new Date().format("yyyy/MM/dd HH:mm:ss")
            
            const newManager = new Managers({
                email,
                password,
                date
            })
            newManager.save().then(() => {
                res.json({status:"200", result:"注册成功"})
            }).catch(err => {
                res.status(500).json({status:"500", result:"未知错误,注册失败"})
            })
        }
    })
})

router.get('/isExpired', passport.authenticate('jwt', {session:false}), (req, res) => {
    res.status(200).json({status: 200, result: '身份未过期'})
})

module.exports = router