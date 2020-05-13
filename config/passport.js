/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-03-05 16:37:00 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-04-29 14:24:35
 */

//验证token合法情况

const users = require('../dbModel/users'),
      managers = require('../dbModel/managers')

const key = require('../linkSecret/jwtKey').secretKey // 私钥（用来解密Token）
const JwtStrategy = require('passport-jwt').Strategy, // strategy(策略)是一些预定义方法,在请求抵达真正路由之前执行.
      ExtractJwt = require('passport-jwt').ExtractJwt // 提供一些提取器工厂函数来获取http中的token
var opts = {    // 相关配置
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: key
}
// 定义验证规则
module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        managers.findById(jwt_payload.id).then(manager => {
            if (manager) {
                return done(null, manager)
            } else {
                users.findById(jwt_payload.id).then(user => {
                    if (user) return done(null, user)
                    else return done(null, false)
                })
            }
        })
    }))
}