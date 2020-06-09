const express = require('express');
//express自带的中间件，路由设置 Router==app
const Router = express.Router();
//为了获取req.body里面的数据
Router.use(express.urlencoded({}));

//引入子路由
const administratorRouter = require('./administrator');
const productRouter = require('./product');
const orderRouter = require('./order');
const userRouter = require('./user');

//调用子路由
Router.use('/administrator', administratorRouter);
Router.use('/product', productRouter);
Router.use('/order', orderRouter);
Router.use('/user', userRouter);

//导出
module.exports = Router;
