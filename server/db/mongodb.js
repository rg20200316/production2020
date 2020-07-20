const { MongoClient } = require('mongodb');
//dbUrl 数据库连接路径；dbName 目标数据库名称
const { dbUrl, dbName } = require('../data/config.json');
//创建连接
async function connect() {
    //新建连接接口  { useNewUrlParser: true, useUnifiedTopology: true }
    let client = await MongoClient.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    //新建创建库的接口
    let db = client.db(dbName);
    return { db, client };
}

//数据的CRUD操作

/*****************  增  **********************/
//colName 列名；data 增加数据的信息[{},{}]OR{}
async function create(colName, data) {
    try {
        //连接数据库
        let { db, client } = await connect();
        //如果有，就连接到对应的数据库；如果没有，那么就自动创建。
        let col = db.collection(colName);
        //把 data 插入到集合中(相当于MySQL中的列)
        let result = await col.insertMany(data);
        //关闭数据库
        client.close();
        //返回响应结果
        return result;
    } catch (err) {
        //如果有错，就显示错误
        if (err) throw err;
    }
}

/*****************  删  **********************/
//colName 列名；query 删除数据的条件[{},{}]OR{}
async function remove(colName, query) {
    try {
        let { db, client } = await connect();
        let col = db.collection(colName);
        //根据删除的条件query，在集合中去删除数据
        let result = await col.deleteMany(query);
        client.close();
        return result;
    } catch (err) {
        if (err) throw err;
    }
}

/*****************  查  **********************/
//colName 列名；query 查询数据的条件[{}] or {}
async function find(colName, query) {
    let { limits, querys, skips } = query;
    let result;
    let res = {};
    try {
        let { db, client } = await connect();
        let col = db.collection(colName);
        result = col.find(querys);
        res.total = result.count();
        if (limits) {
            result = result.limit(limits);
        }
        if (skips) {
            result = result.skip(skips);
        }
        result = await result.toArray();
        res.data = result;
        client.close();
        return res;
    } catch (err) {
        if (err) throw err;
    }
}

/*****************  改  **********************/
//colName 列名；query 修改数据的条件{}；newData 修改后的内容
async function update(colName, query, newData) {
    try {
        let { db, client } = await connect();
        let col = db.collection(colName);
        let result = await col.updateMany(query, newData);
        client.close();
        return result;
    } catch (err) {
        if (err) throw err;
    }
}

//导出
module.exports = {
    create,
    remove,
    find,
    update
}