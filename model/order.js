/**
 * @Name:           order
 * @Description:   订单Bean类, 也即Dao层
 * @Author:         Hevay
 * @Date: create in 2018/10/19  21:05
 */

const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    productId: { //商品的id
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "商品id不能为空"]
    },
    productName: { //商品的名称
        type: String,
        required: [true, "商品名字不能缺少"]
    },
    productPrice: { //商品的价格
        type: String,
        required: [true, "商品价格不能缺少"]
    },
    count: { //商品的数量
        type: Number,
        required: [true, "商品数量不能为空"],
        min: [1, "商品数量不能小于1"]
    },
    total: {//订单总金额
        type: String
    },
    status: {
        type: String, // 订单状态: unpay success cancel
        default: "unpay"
    },
    created: {
        type: Date,
        default: Date.now(),
    },
    payTime: {//付款时间
        type: Date
    },
    cancelTime: Date //订单取消时间
});

module.exports = mongoose.model('orders', schema);
 
   