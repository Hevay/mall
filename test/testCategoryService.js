/**
 @Name:           testCategoryService
 @Description:   测试category分类类别
 @Author:         Hevay
 @Date: create in 2018/10/19  15:55
 */
require("../db");
let Category = require("../service/category");

async function testCategory() {
    //测试添加
    // let result = await Category.addItem({name: "儿童玩具"});
    // console.log(result);

    //测试删除
    //await Category.deleteById("5bc9925254a58322e4bf1bf2");

    //测试修改
    // let category = {name: "数码音像"};
    // await Category.updateById("5bc98fecb74276195c54a715", {name: "数码音像"});
    // console.log(category);

    //测试分页查询
    // let result = await Category.findByPage(3);
    // console.log(result);
}

testCategory();
 
   