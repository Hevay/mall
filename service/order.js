/**
 * @Name:           order
 * @Description:    订单service层,处理业务逻辑,实现对数据库的增删改查
 *                   订单不允许删除,
 *                   此处只实现生成订单和查看订单的功能
 * @Author:         Hevay
 * @Date: create in 2018/10/19  21:09
 */
let Order = require("../model/order");
let Product = require("./product");
let Big = require("big.js"); //用于计算金额,使数据精度不会丢失
let config = require("../config");

/**
 * 生成一个新的订单  post请求
 * url : http://localhost:portNumber/order
 * @param:  order  {productId: id, count: some}
 *          需要根据id获得数据库中对应的商品名称和商品价格,
 *          避免外界类似于sql注入的恶意传参
 *          导入product商品类的service层
 * @return:  {Promise<*>}
 */
async function addItem(order) {
    //根据传入的订单的商品的id获得对应的商品类对象
    let product = await Product.findById({_id: order.productId});
    //如果查找的结果为空,返回错误
    if (!product) {
        throw Error(`id为${order.productId}的商品不存在`);
    }
    //检查库存数量是否足够
    if (order.count > product.stock) {
        throw Error("库存数量不足,请修改订单数量");
    }

    let price = product.price;

    //给订单的商品名和价格重新赋值
    order.productName = product.name;
    order.productPrice = price;
    //计算总金额
    order.total = Big(price) * order.count;

    //下行代码只是改了此处product对象的stock属性的值,并未修改表中的数据
    //product.stock = product.stock - order.count;
    //扣除商品库存数量,需要修改数据库中表里面的数据
    await Product.updateById(order.productId, {stock: product.stock - order.count});
    //生成订单并返回
    return await Order.create(order);
}

/**
 * 分页查询  get请求
 * url : http://localhost:portNumber/order/page
 * @param: page   number类型, 每页的页码,因为是从1开始,所以默认值为1
 * offset,偏移量,每页显示多少条数据,偏移量相应增加
 * @return: {Promise<*>}
 */
async function findByPage(page = 1) {
    let offset = (page - 1) * config.PAGE_SIZE;
    return await Order.find().skip(offset).limit(config.PAGE_SIZE);
}

module.exports = {
    addItem,
    findByPage
};



 
   