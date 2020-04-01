/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-03-05 16:29:10 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-03-31 15:36:22
 */

const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

// 配置
require("./config/http")(app);   // 跨域
require("./mongodb/mongodbConnect");  // 数据库
require("./config/passport")(passport);  // 验证token

// 中间件
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(passport.initialize());

// 路由
const verification = require("./api/verification");
app.use("/api/verification", verification);  // 验证码路由
const admin = require("./api/admin");
app.use("/api/admin", admin);  // 管理员路由
const riskEstimate = require("./api/riskEstimate");
app.use("/api/riskEstimate", riskEstimate); // 风险预估模块路由

// 404页面
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "static/view/404.html"));
})

// 创建服务器
const port = process.env.PORT || 3000;
app.listen(port, err => {
    if(err) throw err;
    console.log(`WebServer is running on port [${port}].`);
})