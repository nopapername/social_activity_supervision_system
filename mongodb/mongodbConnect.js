/*
 * @Author: Mr_Oyjh 
 * @Date: 2020-03-05 16:38:17 
 * @Last Modified by: Mr_Oyjh
 * @Last Modified time: 2020-03-06 13:01:46
 */

const mongoose = require("mongoose");
const mongodbURL = require("../linkSecret/mongodbURL").mongodbURL;

mongoose.connect(mongodbURL, {
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Mongodb is Connected.Please have a great coding.`);
})