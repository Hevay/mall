/**
 @Name:           response_md
 @Description:   全局中间件增强response,给response对象增加了success方法和fail方法
 @Author:         Hevay
 @Date: create in 2018/10/18  23:21
 */

module.exports = (request, response, next) => {
    //给response对象增加了两个方法,类似于kotlin里面的扩展函数
    response.success = (result) => {
        response.send({
            code: 1,
            msg: "操作成功!",
            data: result
        });
    }

    response.fail = (err) => {
        response.send({
            code: -1,
            msg: "操作失败",
            data: err.toString()
        });
    }

    //放行
    next();
}
 
   