const express = require('express');//引入
const Router = express.Router();
let { find, remove } = require('../db/mongodb');
//
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

Router.route('/watch')
    .post(async (req, res) => {//查询
        let { cusName } = req.body;
        let result = await find('Order', { querys: { cusName } });
        let { data: dataList } = result;
        if (dataList.length >= 1) {
            res.send(toast({ data: dataList }));
        } else {
            res.send(toast({ code: 0 }));
        }
    });
Router.route('/rem')
    .post(async (req, res) => {//删除
        let { cusName, shopUid } = req.body;
        let result = await remove('Order', { cusName, shopUid });
        if (result.deletedCount == 1) {
            res.send(toast({ code: 1 }));
        } else {
            res.send(toast({ code: 0 }));
        }
    });

///////////////////////////////////////////////////
Router.route('/hFind')
    .get(async (req, res) => {//查询
        let result = await find('Order', {});//查询所有时，给个空{}
        let { data: dataList } = result;
        if (dataList.length >= 1) {
            res.send(toast({ data: dataList, code: 1 }));
        } else {
            res.send(toast({ code: 0 }));
        }
    });


//导出
module.exports = Router;