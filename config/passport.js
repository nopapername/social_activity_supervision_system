/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-03-05 16:37:00 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-03-18 17:57:32
 */

//验证token合法情况

const users = require('../dbModel/users'),
      managers = require('../dbModel/managers')

const key = require('../linkSecret/jwtKey').secretKey

const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: key
}

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