/**
 * @Name:         product
 * @Description: 商品详情的router层,也就是controller层,接收传入的参数
 调用sercive层业务,返回响应
 request.params.xxx获取参数时,参数必须写在路径后面,方法参数的默认值不生效
 request.query.xxx获取参数时,路径后可以不写参数,方法默认值可以生效
 * @Author:      Hevay
 * @Date: create in 2018/10/19  18:01
 */
let product = require("../service/product");
let router = require("express").Router();

/**
 * 添加一个新的商品  post请求
 * url : http://localhost:portNumber
 * @param:  product  {name: string, price:string, category: id, description: xxx}
 * @return:  {Promise<*>}
 */
router.post("/", async (request, response) => {
    let result = await product.addItem(request.body);
    response.success(result);
});

/**
 * 删除一个商品,delete请求
 * url : http://localhost:portNumber/id
 * @param: id
 */
router.delete("/:id", async (request, response) => {
    await product.deleteById(request.params.id);
    response.success();
});

/**
 * 修改类别  put请求
 * url : http://localhost:portNumber/id
 * @param: id
 * @product: 更新后的数据
 */
router.put("/:id", async (request, response) => {
    await product.updateById(request.params.id, request.body);
    response.success();
});

/**
 * 分页查询  get请求
 * url : http://localhost:portNumber/page
 * @param: page   number类型, 每页的页码,因为是从1开始,所以默认值为1
 * offset,偏移量,每页显示多少条数据,偏移量相应增加
 */
router.get("/", async (request, response) => {
    let result = await product.findByPage(request.query.page);
    response.success(result);
});

module.exports = router;
 
   