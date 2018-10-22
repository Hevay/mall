/**
 * @Name:           permissions_md
 * @Description:    校验权限的中间件
 * @Author:         Hevay
 * @Date: create in 2018/10/22  14:20
 */

//定义各角色对应的权限,是一个数组
let permissions = [
    {
        role: 0,
        urls: [
            //普通用户,可以访问的权限是对商品分类和商品的操作,
            //以及生成订单
            /\/category.*/,
            /\/product.*/,
            /\/order.*/,
        ]
    }
    ,
    {
        //管理员角色,开放所有功能
        role: 999,
        urls: [
            /.*/
        ]
    }
];

module.exports = (request, response, next) => {
    //获取用户请求路径
    let reqUrl = request.url;
    //获取用户对象
    let user = request.user;

    if (user) {
        //如果用户对象不为空
        let isGo = false; //标志位,权限校验通过则改为false;
        //定义一个permission变量和一个url变量,用于在循环中接收permissions的每个元素
        //便于与用户权限的校验
        let permission;
        let url = null;
        outer:for (let i = 0; i < permissions.length; i++) {
            permission = permissions[i];
            //如果用户的角色等于权限校验的角色,再校验请求路径
            if (user.role === permission.role) {
                url = permission.urls; //接收当前permission的路径数组
                //遍历当前角色能够访问的地址
                for (let j = 0; j < url.length; j++) {
                    if (url[j].test(reqUrl)) {
                        //校验通过,将标志位改为true,并跳出整个循环
                        isGo = true;
                        break outer;
                    }
                }
            }
        }
        //遍历循环后如果标志位仍为false,抛出异常,提示用户权限不足
        if (!isGo) {
            throw Error("对不起,权限不足,无法访问请求的地址");
        }
    }
    //放行
    next();
};
   