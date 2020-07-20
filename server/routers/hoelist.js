const express = require('express');//引入
const Router = express.Router();
let toast = require('../utils/toast');
// 引入数据
let listdata = require('../data/hoelist.json');

// 关键字查询
Router.route('/find')
    .get(async (req, res) => {
        res.send(toast({
            code: 1,
            data: listdata.data
        }));
    });

//导出
module.exports = Router;