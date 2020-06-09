const express = require('express');//引入
const Router = express.Router();
let { find, remove } = require('../db/mongodb');

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

Router.post('/watch', async (req, res) => {//验证账号密码是否正确
    let { cusUid, cusPass } = req.body;
    let result = await find('Customer', { querys: { cusUid, cusPass } });//find三个参数 limits, querys, skips
    if (result.data.length > 0) {
        res.send(toast({ data: result.data }));
    } else {
        codes = 0;//不存在 登录失败
        res.send(toast({ code: codes }));
    }
});

//////////////////////////////////
Router.route('/hFind')
    .get(async (req, res) => {//查询
        let result = await find('Customer', {});
        let { data: dataList } = result;
        if (dataList.length >= 1) {
            res.send(toast({ data: dataList }));
        } else {
            res.send(toast({ code: 0 }));
        }
    });

Router.route('/rem')
    .post(async (req, res) => {
        let codes = '';
        let { cusName } = req.body;
        let result = await remove('Customer', { cusName });
        if (result.deletedCount >= 1) {
            codes = 1;
            res.send(toast({ code: codes }));
        } else {
            codes = 0;
            res.send(toast({ code: codes }));
        }
    });

module.exports = Router;