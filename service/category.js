/**
 @Name:           category
 @Description:    类别的service层,实现对各商品类别的增删改查
 @Author:         Hevay
 @Date: create in 2018/10/19  15:08
 */
let Category = require("../model/category");
let config = require("../config");

/**
 * 添加一个商品分类  post请求
 * url : http://localhost:portNumber/category
 * @param:  categrory  {name: string}
 * @return:  {Promise<*>}
 */
async function addItem(category) {
    let result = await Category.findOne({name: category.name});
    if (result) {
        throw Error(`"${category.name}"类别已经存在,请勿重复添加`);
    }
    return await Category.create(category);
}

/**
 * 删除一个商品分类,delete请求
 * url : http://localhost:portNumber/category/id
 * @param: id
 */
async function deleteById(id) {
    let result = await Category.findOne({_id: id});
    if (!result) {
        throw Error(`id为${id}的类别不存在!`);
    }
    result = await Category.deleteOne(result);
    if (result.n !== 1) {
        throw Error(`删除id为${id}的数据失败`);
    }
}

/**
 * 修改类别  put请求
 * url : http://localhost:portNumber/category/id
 * @param: id
 * @category: 更新后的数据
 */
async function updateById(id, category) {
    let result = await Category.findOne({_id: id});
    if (!result) {
        throw Error(`您要修改的id为${id}的类别不存在!`);
    }
    result = await Category.updateOne({_id: id}, category);
    if (result.n !== 1) {
        throw Error(`修改id为${id}的类别失败`);
    }
}

/**
 * 分页查询  get请求
 * url : http://localhost:portNumber/category/page
 * @param: page   number类型, 每页的页码,因为是从1开始,所以默认值为1
 * offset,偏移量,每页显示多少条数据,偏移量相应增加
 * @return: {Promise<*>}
 */
async function findByPage(page = 1) {
    let offset = (page - 1) * config.PAGE_SIZE;
    return await Category.find().skip(offset).limit(config.PAGE_SIZE);
}

module.exports = {
    addItem,
    deleteById,
    updateById,
    findByPage
};




 
   