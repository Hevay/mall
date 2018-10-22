/**
 * @Name:           token_md
 * @Description:    用于校验用户是否登录的koten中间件
 *                   只有当用户发起的请求是注册或登录时不进行校验
 *                   否则都需要进行校验,如果请求里没有token数据,提示用户请先登录
 * @Author:         Hevay
 * @Date: create in 2018/10/19  22:42
 */
let config = require("../config");
let encryptUtil = require("../utils/encryptUtil");
let User = require("../service/user");

//定义校验请求路径逻辑
function checkUrl(url) {
    //正则表达式
    let igoneUrls = [
        /\/user\/regist/,
        /\/user\/login/
    ];

    //标志位，方法的返回值
    let needCheck = true;
    for (let i = 0; i < igoneUrls.length; i++) {
        let igoneUrl = igoneUrls[i];
        if (igoneUrl.test(url)) {
            needCheck = false;
            break;
        }
    }

    return needCheck;
}

module.exports = async (request, response, next) => {
    //获得用户请求路径
    //只有当用户发起的请求路径是登录或注册时,才不需要进行校验
    let url = request.url;
    if (checkUrl(url)) {
        //需要校验路径，首先获取token数据
        let token = request.get("token");
        if (!token) {
            throw Error("请求消息中没有token数据，请先登录");
        }

        //如果有Token
        let tokenData = null;
        try {
            tokenData = encryptUtil.aesDecrypt(token, config.TOKEN_KEY);
        } catch (e) {
            throw Error("token解密失败，请登录");
        }

        //把json对象转换成字符串
        let tokenJS = JSON.parse(tokenData);
        //获取token的有效期
        let expire = tokenJS.expire;
        if (Date.now() > expire) {
            throw Error("token已过期，请重新登录");
        }
        let username = tokenJS.username;
        let user = await User.findByUsername(username);
        if (!user) {
            //用户不存在，token数据无效
            throw Error("token无效，请重新登录");
        }
        //将查询到的user对象重新复制给request请求消息头，便于后续操作
        request.user = user;
    }
    //放行
    next();
};
 
   