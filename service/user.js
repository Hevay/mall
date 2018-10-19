/**
 @Name:           user
 @Description:    用户service层,定义并实现增删改查
 @Author:         Hevay
 @Date: create in 2018/10/18  17:01
 */

let User = require("../model/user");
let encryptUtil = require("../utils/encryptUtil");

/**
 * 注册用户  post请求
 * url : http://localhost:portNumber/user
 * @param user = {username: "zhangsan", password: "123"}
 * @returns {Promise<void>}
 */
async function regist(user) {
    let result = await findByUsername(user.username);
    if (result) {
        throw Error(`很抱歉,用户名"${user.username}"已经被占用!`);
    }
    //将密码进行重新加密
    user.password = encryptUtil.md5Hmac(user.password, user.username);

    //将用户的角色重新赋值为普通用户
    user.role = 0;
    result = await User.create(user);
    //将创建的用户对象的密码重置为空串
    result.password = "";
    return result;
}

/**
 * 根据传入的用户名删除用户
 * delete请求 :  http://localhost:portNumber/user
 * @param username
 */
async function deleteByUsername(username) {
    //首先检查传入进来的用户名在数据库中是否存在
    await isExistByUsername(username);
    //将传入进来的用户名所对应的用户对象删除
    //如果操作不成功,则抛出异常
    let result = await User.deleteOne({username: username});
    if (result.n !== 1) {
        throw Error(`删除用户名为"${username}"的用户失败`);
    }
}

/**
 * 根据传入的参数查找用户,如果不存在,则抛出异常
 * @param username
 * @returns {Promise<void>}
 */
async function isExistByUsername(username) {
    let result = await findByUsername(username);
    if (!result) {
        throw Error(`用户名为"${username}"的用户不存在`);
    }
}

/**
 * 根据传入的参数修改用户资料  put请求
 * url :  http://localhost:portNumber/user/id
 * @param id
 * @param user  更新后的数据,格式为: {name: "username", password: "password"}
 */
async function updateById(id, user) {
    //首先要根据传入进来的id进行查找,确定用户存在
    let result = await User.findOne({_id: id});
    if (!result) {
        throw Error(`对不起,您要修改的用户不存在`);
    }

    //更新用户数据,需要将存入的密码重新进行加密
    user.password = encryptUtil.md5Hmac(user.password, user.username);
    result = await User.updateOne({_id: id}, user);
    if (result.n !== 1) {
        throw Error(`更新id为"${id}"的用户资料失败`);
    }
}

/**
 * 根据用户名查找用户并返回  get请求
 * * url :  http://localhost:portNumber/user/username
 * @param username
 */
async function findByUsername(username) {
    return await User.findOne({username: username});
}

/**
 * 登录功能  post请求
 * url : https://localhost:portNumber/user
 * @param user
 */
async function login(user) {
    //首先按照参数的用户名进行查找,确定用户存在
    await isExistByUsername(user.username);
    //获得传入进来的密码参数,并进行判断检查,确定传入值不为空
    let password = user.password;
    if (password == null || password.trim().length === 0) {
        throw Error("密码不能为空!");
    }
    //将传入的密码重新进行加密,以便于dao层(也就是model)进行查找
    user.password = encryptUtil.md5Hmac(password, user.username);
    //取出查找的结果
    user = await User.findOne(user);
    //将取得的结果对象的密码清空
    user.password = "";
    return user;
}

module.exports = {
    regist,
    deleteByUsername,
    updateById,
    login,
    findByUsername
};