/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-03-13 17:04:18 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-24 19:07:14
 */

const router = require('express').Router()
const bcrypt = require("bcrypt") // 加密解密
const jwt = require("jsonwebtoken")
const jwt_key = require("../linkSecret/jwtKey").secretKey
const passport = require("passport")
require("../config/date")
// 数据库模型
const Managers = require('../dbModel/managers')
const Operatings = require('../dbModel/operatingModel')
const Dictionarys = require('../dbModel/dictionaryModel')

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
                    role: manager.role,
                    authority: manager.authority,
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
            const role = '系统管理员'
            const authority = '0'
            
            const newManager = new Managers({
                email,
                password,
                date,
                role,
                authority
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

router.get('/getAllManagers', (req, res) => {
    Managers.find().then((managers) => {
        managers.length ? res.send(managers) : res.json({
            status: 200,
            result: "数据为空"
        })
    }).catch((err) => {
        res.status(500).json({
            status: 500,
            result: '未知错误，用户列表获取失败'
        })
    })
})

router.post('/updatePassword', (req, res) => {
    let _id = req.body._id
    let newPassword = req.body.newPassword
    Managers.findOneAndUpdate({
        _id
    }, {
        $set: {
            password: newPassword
        }
    }, {
        new: true
    }).then(managers => {
        managers.save()
            .then(() => {
                console.log("密码更新成功");
                res.status(200).json({
                    status: "200",
                    result: "密码更新成功"
                })
            }).catch(err => {
                console.log(err)
                res.status(500).json({
                    status: "500",
                    result: "密码更新失败,未知错误"
                })
            })
    })
})

router.post('/removeManager', (req, res) => {
    let _id = req.body._id
    Managers.findByIdAndRemove({
        _id
    }).then(() => {
        console.log("用户删除成功");
        res.status(200).json({
            status: "200",
            result: "用户删除成功"
        })
    }).catch(err => {
            console.log(err)
            res.status(500).json({
                status: "500",
                result: "用户删除失败,未知错误",
                err: err
            })
        })
})

router.post('/updateRole', (req, res) => {
    let _id = req.body._id
    let newrole = req.body.role
    Managers.findOneAndUpdate({
        _id
    }, {
        $set: {
            role: newrole
        }
    }, {
        new: true
    }).then(managers => {
        managers.save()
            .then(() => {
                console.log("用户角色修改成功");
                res.status(200).json({
                    status: "200",
                    result: "用户角色修改成功"
                })
            }).catch(err => {
                console.log(err)
                res.status(500).json({
                    status: "500",
                    result: "用户角色修改失败,未知错误"
                })
            })
    })
})

router.post('/updateAuthority', (req, res) => {
    let _id = req.body._id
    let newAuthority = req.body.authority
    Managers.findOneAndUpdate({
        _id
    }, {
        $set: {
            authority: newAuthority
        }
    }, {
        new: true
    }).then(managers => {
        managers.save()
            .then(() => {
                console.log("用户权限修改成功");
                res.status(200).json({
                    status: "200",
                    result: "用户权限修改成功"
                })
            }).catch(err => {
                console.log(err)
                res.status(500).json({
                    status: "500",
                    result: "用户权限修改失败,未知错误"
                })
            })
    })
})


router.post('/submitOperating', (req, res) => {
    const email = req.body.email
    const role = req.body.role
    const operate = req.body.operate
    const date = new Date().format("yyyy/MM/dd HH:mm:ss")

    const newOperatings = new Operatings({
        email,
        role,
        operate,
        date
    })
    newOperatings.save().then(() => {
        res.json({
            status: "200",
            result: `操作日志已添加`
        })
    }).catch(err => {
        res.status(500).json({
            status: "500",
            result: "未知错误,日志添加失败"
        })
    })
})

router.get('/getAllOperating', (req, res) => {
    Operatings.find().then((operatings) => {
        operatings.length ? res.send(operatings) : res.json({
            status: 200,
            result: "数据为空"
        })
    }).catch((err) => {
        res.status(500).json({
            status: 500,
            result: '未知错误，用户列表获取失败'
        })
    })
})

router.post('/removeOperating', (req, res) => {
    let _id = req.body._id
    Operatings.findByIdAndRemove({
        _id
    }).then(() => {
        console.log("操作记录删除成功");
        res.status(200).json({
            status: "200",
            result: "操作记录删除成功"
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            status: "500",
            result: "操作记录删除失败,未知错误",
            err: err
        })
    })
})


router.get('/getAllDictionary', (req, res) => {
    Dictionarys.find().then((dictionaries) => {
        dictionaries.length ? res.send(dictionaries) : res.json({
            status: 200,
            result: "数据为空"
        })
    }).catch((err) => {
        res.status(500).json({
            status: 500,
            result: '未知错误，字典失败'
        })
    })
})

router.post('/removeDictionaryRole', (req, res) => {
    let _id = '5ea2bab5c6d1455350eb6ee3'
    let value = req.body.value
    Dictionarys.findById({
        _id
    }).then((diction) => {
        let index = diction.dictionary.roleList.findIndex((item) => {
            item.value === value
        })
        diction.dictionary.roleList.splice(index, 1)
        Dictionarys.findOneAndUpdate({
            _id
        }, {
            $set: {
                dictionary: diction.dictionary
            }
        }, {
            new: true
        }).then(dict => {
            dict.save()
                .then(() => {
                    console.log("字典删除成功");
                    res.status(200).json({
                        status: "200",
                        result: "字典删除成功"
                    })
                }).catch(err => {
                    console.log(err)
                    res.status(500).json({
                        status: "500",
                        result: "字典删除错误,未知错误"
                    })
                })
        })
        
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            status: "500",
            result: "字典删除失败,未知错误",
            err: err
        })
    })
})

router.post('/addDictionaryRole', (req, res) => {
    let _id = '5ea2bab5c6d1455350eb6ee3'
    let value = req.body.value
    Dictionarys.findById({
        _id
    }).then((diction) => {
        diction.dictionary.roleList.push({
            value: value,
            label: value
        })
        console.log(diction.dictionary.roleList)
        Dictionarys.findOneAndUpdate({
            _id
        }, {
            $set: {
                dictionary: diction.dictionary
            }
        }, {
            new: true
        }).then(dict => {
            dict.save()
                .then(() => {
                    console.log("字典增加成功");
                    res.status(200).json({
                        status: "200",
                        result: "字典增加成功"
                    })
                }).catch(err => {
                    console.log(err)
                    res.status(500).json({
                        status: "500",
                        result: "字典增加错误,未知错误"
                    })
                })
        })

    }).catch(err => {
        console.log(err)
        res.status(500).json({
            status: "500",
            result: "字典删除失败,未知错误",
            err: err
        })
    })
})


module.exports = router