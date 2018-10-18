/**
 @Name:           app
 @Description:    程序入口
 @Author:         Hevay
 @Date: create in 2018/10/18  15:18
 */

//处理全局异常错误的模块,放在第一行
require("express-async-errors");
require("./db");
let config = require("./config");
let express = require("express");

let morgan = require("morgan"); //处理日志

let app = express();

//使用全局中间件增强response
app.use(require("./middleware/response_md"));
//使用日志功能
app.use(morgan("combined"));

//解析json格式的数据
app.use(express.json());
//挂载自定义的router
app.use("/user", require("./router/user"));

//处理全局异常的中间件
app.use((err, request, response, next) => {
    //使用responseUtil写回失败的响应
    //responseUtil.fail(response, err);
    //使用全局中间件增强response写回失败的响应
    response.fail(err);
});

app.listen(config.PORT);


 
   