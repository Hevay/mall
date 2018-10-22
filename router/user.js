/**
 @Name:           user
 @Description:   user模块的路由
 @Author:         Hevay
 @Date: create in 2018/10/18  21:56
 */
let user = require("../service/user");
let router = require("express").Router();
let config = require("../config");
let encryptUtil = require("../utils/encryptUtil");

/**
 * 注册用户  post请求
 * url : http://localhost:portNumber/user
 * @param user = {username:  "zhangsan", password: "123"}
 */
router.post("/regist", async (request, response) => {
    let result = await user.regist(request.body);
    response.success(result);
});

/**
 * 根据传入的用户名删除用户
 * delete请求 :  http://localhost:portNumber/user/username
 * @param username
 */
router.delete("/:username", async (request, response) => {
    await user.deleteByUsername(request.params.username);
    response.success();
});

/**
 * 根据传入的参数修改用户资料  put请求
 * url :  http://localhost:portNumber/user/id
 * @param id
 * @param user  更新后的数据,格式为: {name: "username", password: "password"}
 */
router.put("/:id", async (request, response) => {
    let id = request.params.id;
    let body = request.body;
    user.updateById(id, body);
    response.success();
});

/**
 * 根据用户名查找用户并返回  get请求
 * url :  http://localhost:portNumber/user/id
 * @param username
 */
router.get("/:username", async (request, response) => {
    let username = request.params.username;
    let result = await user.findByUsername(username);
    if (result) {
        result.password = "";
        response.success(result);
    } else {
        throw Error(`用户名为"${username}"的用户不存在`);
    }
});

/**
 * 登录功能  post请求
 * url : https://localhost:portNumber/user
 * @param user
 */
router.post("/login", async (request, response) => {
    //登录
    let result = await user.login(request.body);
    //定义token
    let token = {
        username: result.username,
        expire: Date.now() + config.TOKEN_EXPIRE
    };
    //参数1: 原文   参数2: 密钥
    let encryptData = encryptUtil.aesEncrypt(JSON.stringify(token), config.TOKEN_KEY);
    //将加密后的token数据写回给浏览器
    response.success(encryptData);
});

module.exports = router;
 
   