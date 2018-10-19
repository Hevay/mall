/**
 @Name:           testUserService
 @Description:   测试user模块
 @Author:         Hevay
 @Date: create in 2018/10/18  19:34
 */
require("../db");
let userService = require("../service/user");

async function testUser() {
    //测试注册功能
    // let user = {username: "张三", password:"123",role:999};
    // user = await userService.regist(user);
    // console.log(user);

    //测试登录功能
    let user = {username: "zhansan", password: "123"};
    user = await userService.login(user);
    console.log(user);

    //测试查找
    // let user = await userService.findByUsername("张三");
    // console.log(user);


    //测试修改功能
    // let user = {username: "张三", password: "123"};
    // await userService.updateById("5bc8898868b38242941ab395",user);
    // console.log(user);

    //测试删除功能
    // await userService.deleteByUsername("张三");
}

testUser();
   