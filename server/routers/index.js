const express = require('express');
//express自带的中间件，路由设置 Router==app
const Router = express.Router();

//获取req.body里面的数据
Router.use(express.urlencoded({}));

//引入前台子路由(移动端)
const searchdataRouter = require('./searchdata');
const hoelistRouter = require('./hoelist');

//引入后台子路由(后台)
const syshoelistRouter = require('./syshoelist');
const syscustomerRouter = require('./syscustomer');
const syssecnicsRouter = require('./syssecnics');
const sysordersRouter = require('./sysorders');

//调用子路由(移动端)
Router.use('/searchdata', searchdataRouter);
Router.use('/hoelist', hoelistRouter);

//调用后台子路由(后台)
Router.use('/syshoelist', syshoelistRouter);
Router.use('/syscustomer', syscustomerRouter);
Router.use('/syssecnics', syssecnicsRouter);
Router.use('/sysorders', sysordersRouter);

//导出
module.exports = Router;