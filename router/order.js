/**
 * @Name:           order
 * @Description:   订单相关的controller层,接收参数,调用sercive层处理业务逻辑,返回响应
 * @Author:         Hevay
 * @Date: create in 2018/10/19  22:20
 */

let Order = require("../service/order");
let router = require("express").Router();

/**
 * 生成一个新的订单  post请求
 * url : http://localhost:portNumber/order
 * @param:  order  {productId: id, count: some}
 *          需要根据id获得数据库中对应的商品名称和商品价格,
 *          避免外界类似于sql注入的恶意传参
 *          导入product商品类的service层
 * @return:  {Promise<*>}
 */
router.post("/", async (request, response) => {
    let result = await Order.addItem(request.body);
    response.success(result);
});

/**
 * 分页查询  get请求
 * url : http://localhost:portNumber/order/page
 * @param: page   从请求体中获得, 默认的参数为1
 * offset,偏移量,每页显示多少条数据,偏移量相应增加
 * @return: {Promise<*>}
 */
router.get("/", async (request, response) => {
    let result = await Order.findByPage(request.query.page);
    response.success(result);
});

module.exports = router;