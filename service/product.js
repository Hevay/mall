/**
 * @Name:           product
 * @Description:   商品类相关业务调用增删改查
 * @Author:         Hevay
 * @Date: create in 2018/10/19  17:43
 */

let Product = require("../model/product");
let config = require("../config");

/**
 * 添加一个新的商品  post请求
 * url : http://localhost:portNumber/product
 * @param:  product  {name: string, price:string, category: id, description: xxx}
 * @return:  {Promise<*>}
 */
async function addItem(product) {
    let result = await Product.findOne({name: product.name});
    if (result) {
        throw Error(`名字为"${product.name}"的商品已经存在,请勿重复添加`);
    }
    return await Product.create(product);
}

/**
 * 删除一个商品,delete请求
 * url : http://localhost:portNumber/product/id
 * @param: id
 */
async function deleteById(id) {
    let result = await Product.findOne({_id: id});
    if (!result) {
        throw Error(`id为${id}的商品不存在!`);
    }
    result = await Product.deleteOne({_id: id});
    if (result.n !== 1) {
        throw Error(`删除id为${id}的商品失败`);
    }
}

/**
 * 修改类别  put请求
 * url : http://localhost:portNumber/product/id
 * @param: id
 * @product: 更新后的数据
 */
async function updateById(id, product) {
    let result = await Product.findOne({_id: id});
    if (!result) {
        throw Error(`id为${id}的商品不存在!`);
    }
    result = await Product.updateOne({_id: id}, product);
    if (result.n !== 1) {
        throw Error(`更新id为${id}的商品失败`);
    }
}

/**
 * 分页查询  get请求
 * url : http://localhost:portNumber/product/page
 * @param: page   number类型, 每页的页码,因为是从1开始,所以默认值为1
 * offset,偏移量,每页显示多少条数据,偏移量相应增加
 * @return: {Promise<*>}
 */
async function findByPage(page = 1) {
    let offset = (page - 1) * config.PAGE_SIZE;
    return await Product.find().skip(offset).limit(config.PAGE_SIZE);
}

/**
 * 根据id查找对应的商品 get请求
 * url : http://localhost:portNumber/product/id
 * @param id
 * @return {Promise<*>}
 */
async function findById(id) {
    return await Product.findOne({_id: id});
}

module.exports = {
    addItem,
    deleteById,
    updateById,
    findByPage,
    findById
};

 
   