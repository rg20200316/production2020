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

//导出
module.exports = toast;