// 后台系统  酒店列表 sysorders
const express = require('express');//引入
const Router = express.Router();
let { create, remove, find, update } = require('../db/mongodb');
let toast = require('../utils/toast');

//查询所有
Router.route('/all')
    .get(async (req, res) => {
        let result = await find('orders', { querys: {} });
        let { data } = result;
        if (data.length >= 1) {
            res.send(toast({ data }));
        } else {
            res.send(toast({ code: 0 }));
        }
    });

// 关键字查询
Router.route('/watch')
    .get(async (req, res) => {
        let { dataName, dataId, visitorName } = req.query;
        console.log(visitorName);
        // dataName, dataId 搜索功能请求封装  hotelName, uid
        let hotelName = dataName;
        let uid = dataId;
        let result;
        if (uid) {
            // 有参数时，按参请求
            result = await find('orders', { querys: { uid } });
        } else if (hotelName) {
            result = await find('orders', { querys: { hotelName } });
        } else if (visitorName) {
            result = await find('orders', { querys: { visitorName } });
        } else if (uid && hotelName) {
            // 两个参数时，以前者为主
            result = await find('orders', { querys: { uid, hotelName } });
        } else {
            result = {// 没有参数时，请求失败
                data: []
            }
        }
        let { data } = result;
        if (data.length >= 1) {
            res.send(toast({ data }));
        } else {
            res.send(toast({ code: 0 }));
        }
    });

// 添加
Router.get('/add', async (req, res) => {
    let data = [];
    data.push(req.query);
    let result = await create('orders', data);
    let { insertedCount } = result;
    if (insertedCount >= 1) {
        res.send(toast({ code: 1 }));
    } else {
        res.send(toast({ code: 0 }));
    }
});

// 删除
Router.get('/del', async (req, res) => {
    let { uid, visitorName } = req.query;
    let result;
    if (uid) {
        result = await remove('orders', { uid });
    } else if (visitorName) {
        result = await remove('orders', { visitorName });
    }
    let { deletedCount } = result;
    if (deletedCount >= 1) {
        res.send(toast({ code: 1 }));
    } else {
        res.send(toast({ code: 0 }));
    }
});

// 修改  
Router.get('/update', async (req, res) => {

    let newData = {};
    let { uid } = req.query;
    let obj = req.query;
    if (uid) {
        for (var key in obj) {
            if (obj[key]) {
                newData.key = key;
                newData[key] = obj[key];
            }
        }
        delete newData.key;
        let result = await update('orders', { uid }, { $set: newData });
        let { modifiedCount } = result;
        if (modifiedCount >= 1) {
            res.send(toast({ code: 1 }));
        } else {
            res.send(toast({ code: 0 }));
        }
    }
    else {
        res.send(toast({ code: 0 }));
    }
});

//导出
module.exports = Router;