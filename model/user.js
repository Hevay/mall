/**
 @Name:           user
 @Description:    定义用户数据的各属性
 @Author:         Hevay
 @Date: create in 2018/10/18  16:28
 */
let mongoose = require("mongoose");
let schema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "用户名不能为空"]
    },
    password: {
        type: String,
        require: [true, "密码不能为空"]
    },
    role: { //用户扮演的角色
        type: Number,
        default: 0   //0为普通用户, 999管理员
    },
    created: {
        type: Date,   //用户注册的时间
        default: Date.now()
    }
});

//第一个参数:在mongoDB中生成的表名,
//第二个参数: 将定义的字段用于生成的表中
module.exports = mongoose.model("users", schema);