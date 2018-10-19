/**
 @Name:           category
 @Description:   类别
 @Author:         Hevay
 @Date: create in 2018/10/19  12:09
 */
let mongoose = require("mongoose");
let schema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "类别不能为空"]
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

//第一个参数:在mongoDB中生成的表名,
//第二个参数: 将定义的字段用于生成的表中
module.exports = mongoose.model("categories", schema);