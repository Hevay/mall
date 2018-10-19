/**
 @Name:           product
 @Description:   商品详情
 @Author:         Hevay
 @Date: create in 2018/10/19  12:07
 */

let mongoose = require("mongoose");
let schema = new mongoose.Schema({
    name: { //商品名字
        type: String,
        require: [true, "商品名称不能为空"],
        unique: [true, "商品名字不能重复"]
    },
    price: {//商品价格
        type: String,
        require: [true, "商品价格不能为空"],
    },
    stock: { //商品的库存,最小为0,默认为0
        type: Number,
        min: 0,
        default: 0
    },
    category: {//商品分类的id
        type: mongoose.Types.ObjectId,
        require: [true, "分类id不能为空"]
    },
    description: String, //商品详情说明
    isOnSale: {//是否上架,默认true
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

//第一个参数:在mongoDB中生成的表名,
//第二个参数: 将定义的字段用于生成的表中
module.exports = mongoose.model("products", schema);