const express = require('express');
//设置端口号
const { PORT } = require('./data/config.json');
//开启服务器
const app = express();
//导入路由 掌控所有路由
const Router = require('./routers');
//默认跳转的接口
app.use(express.static('./'));
//把这个路由配置放在所有路由的前面，方便调用next操作
app.use((req, res, next) => {
    // 请求头
    // res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Access-Token");
    res.setHeader("Access-Control-Expose-Headers", "*");
    // 跨域请求CORS中的预请求
    if (req.method == "OPTIONS") {//特殊请求：发送了请求头的那些请求
        res.sendStatus(200);/*让options请求快速返回*/
    } else {
        next();
    }
});
//调用总路由，router现在相当于一个中间件
app.use(Router);
//访问地址
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log('服务器已开启：' + PORT);
});