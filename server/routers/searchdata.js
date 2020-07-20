const express = require('express');//引入
const Router = express.Router();
let toast = require('../utils/toast');
// 引入数据
let data = require('../data/inland.json');
let keyData = require('../data/searchKeys.json');
// 国内
let inland = data.data[0].data.inland;
// 国外
let foreign = data.data[0].data.foreign;

// 选项卡切换时响应的数据
Router.route('/find')
    .get(async (req, res) => {
        if (req.query.discern == 'inland') {
            //返回信息
            res.send(toast({
                code: 1,
                data: inland
            }));
        } else if (req.query.discern == 'foreign') {
            //返回信息
            res.send(toast({
                code: 1,
                data: foreign
            }));
        } else {
            res.send(toast({
                code: 0
            }));
        }
    });

// 关键字查询
Router.route('/key')
    .get(async (req, res) => {
        res.send(toast({
            code: 1,
            data: keyData
        }));
    });

//导出
module.exports = Router;