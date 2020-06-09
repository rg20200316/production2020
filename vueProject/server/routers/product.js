const express = require('express');//引入
const Router = express.Router();

let { find, create } = require('../db/mongodb');

function toast(opt) {
    let defaults = {  //默认参数
        code: 1,
        mes: '操作成功',
        data: []
    }
    if (opt) {   //替补参数
        Object.assign(defaults, opt);
        if (opt.code == 0) {
            defaults.mes = '操作失败'
        }
    }
    return defaults;
}


Router.route('/watch')//查询
    .get(async (req, res) => {
        let { shopName } = req.query;
        let result = await find('Product', { querys: { shopName } });
        let { data: dataList } = result;
        if (dataList.length >= 1) {//判断是否有数据
            res.send(toast({
                code: 1,
                data: dataList
            }));
        } else {
            res.send(toast({ code: 0 }));
        }
    });


////////////////////////////////////后台请求数据
Router.route('/all')//分页查询
    .get(async (req, res) => {
        let pagesize = req.query.pagesize * 1; //内容条数
        let page = req.query.page * 1; //页码
        let pagenum = (page - 1) * pagesize;//获取区间起点数
        result = await find('Product', {
            limits: pagesize,
            skips: pagenum,
        });
        let { data: dataList, total } = result;
        let pagetotals = await total;//总条数
        let pagesnum = Math.ceil(pagetotals * 1 / pagesize);//总页码数

        if (dataList.length >= 1) {
            res.send(toast({
                code: 1,
                pagesnum,
                data: dataList
            }));
        } else {
            res.send(toast({ code: 0 }));
        }
    });

Router.route('/add')//增加
    .post(async (req, res) => {
        let { shopName, shopUid, shopPrice, shopStock, shopInfor, shopType, shopImg } = req.body;//接收的数据
        let result = await create('Product', [{
            shopName,
            shopUid,
            shopPrice,
            shopStock,
            shopInfor,
            shopType,
            shopImg
        }]);//注入的数据
        res.send(result);//返回信息
        /**
         * http://localhost:12130/product/add + 数据
         */
    });



// Router.route('/hFind')
//     .get(async (req, res) => {//查询
//         //let result = await find('Product');
//         console.log(req);
//         // if (result.length >= 1) {
//         //     res.send(toast({ data: result }));
//         // } else {
//         //     res.send(toast({ code: 0 }));
//         // }
//     });

//导出
module.exports = Router;
/**
 *
 *
/////////////////////////////////分页///////////////////////////////////
 let pagesize = req.query.pagesize * 1;
        let page = req.query.page * 1;
        let result = null;
        if (req.query.pagesize == undefined && req.query.page == undefined) {
            result = await find('Product', {//默认获取全部数据
                limits: 0,//一次性读取多少数据
                skips: 0,//从第几条开始读取
            });
            console.log('不需要分页！');
        } else {
        let pagenum = (page - 1) * pagesize;//起点获取数
        result = await find('Product', {
            limits: pagesize,
            skips: pagenum,
        });
            console.log('..........需要分页..........！');
        }
        res.send(result);

 */