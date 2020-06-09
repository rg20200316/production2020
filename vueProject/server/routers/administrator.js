const express = require('express');//引入
const Router = express.Router();

let { find } = require('../db/mongodb');
//配置提示信息
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
//登陆 Administrator/login
Router.route('/login')
    .post(async (req, res) => {
        let data2 = [];
        let obj = {};
        let { username, userpass } = req.body;
        let result = await find('Administrator', { username, userpass });
        console.log(result.length);
        if (result.length > 0) {
            obj.username = username;
            obj.userpass = userpass;
            data2.push(obj);
            //登陆成功
            res.send(toast({ data: data2 }));
        } else {
            //登陆失败
            res.send(toast({ code: 0 }));
        }
    });

//导出
module.exports = Router;