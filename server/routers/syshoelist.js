// 后台系统  酒店列表 syshoelist
const express = require('express');//引入
const Router = express.Router();
let { find, remove } = require('../db/mongodb');
let toast = require('../utils/toast');

//查询所有
Router.route('/all')
    .get(async (req, res) => {
        let result = await find('hotels', { querys: {} });
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
        let { dataName, dataId } = req.query;
        // dataName, dataId 搜索功能请求封装  hotelName, uid
        let hotelName = dataName;
        let uid = dataId;
        let result;
        if (uid) {
            // 有参数时，按参请求
            result = await find('hotels', { querys: { uid } });
        } else if (hotelName) {
            // 有参数时，按参请求
            result = await find('hotels', { querys: { hotelName } });
        } else if (uid && hotelName) {
            // 两个参数时，以前者为主
            result = await find('hotels', { querys: { uid, hotelName } });
        } else {
            // 没有参数时，请求失败
            result = {
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

Router.route('/paging')//分页查询
    .get(async (req, res) => {
        let { dataName, dataId } = req.query;
        // dataName, dataId 分页功能请求封装  page, pageSize
        let page = dataName * 1; //页码
        let pageSize = dataId * 1; //内容条数  
        let pagenum = (page - 1) * pageSize;//获取区间起点数
        // 分页请求的条件
        result = await find('hotels', {
            limits: pageSize,
            skips: pagenum,
        });
        let { data, total } = result;
        // 数据总条数
        let pagetotals = await total;

        if (data.length >= 1) {
            res.send(toast({
                code: 1,
                pagetotals,
                data
            }));
        } else {
            res.send(toast({ code: 0 }));
        }
    });

//导出
module.exports = Router;