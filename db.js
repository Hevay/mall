let config = require("./config");
let mongoose = require("mongoose");
//连接数据库
mongoose.connect(`mongodb://localhost/${config.DB}`, {useNewUrlParser: true});
let db = mongoose.connection;

db.on("error", (err) => {
    console.log(`数据库连接失败: ${err.toString()}`);
});

db.once("open", () => {
    console.log("连接mongodb成功！");
});
 
   