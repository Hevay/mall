/**
 @Name:           prod
 @Description:   生产环境下的环境配置
 @Author:         Hevay
 @Date: create in 2018/10/18  15:38
 */

module.exports = {
    PORT: 80,
    DB: "product-manager",
    TOKEN_EXPIRE: 1000 * 60 * 60 * 24 * 7,
    TOKEN_KEY: "product-manager",
    PAGE_SIZE: 10
};

 
   