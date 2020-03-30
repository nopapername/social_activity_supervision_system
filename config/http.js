/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-03-05 16:36:57 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-03-18 17:49:31
 */

module.exports = app => {
    app.all("*", (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild')
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH')
        if(req.method === 'OPTIONS') {
            res.sendStatus(200) // 让options请求快速返回
        }
        else{
            next()
        }
    })
}