var mongodb = require('mongodb');
var lineReader = require('line-reader');
var server = new mongodb.Server('localhost', 27017, { auto_reconnect: true });
//连接的数据库为react
var db = new mongodb.Db('ReactProject', server, { safe: true });

db.open(function (err, db) {
    if (!err) {
        // 游客文档： 游客名、id、房间号、下单时间、入住时间、景点名
        // visitorId,visitorName,orderTime,moveinTime,moveinTime,visitorPlace,roomNum,uid
        db.createCollection('customers', { safe: true }, function (err, collection) {
            if (err) {
                console.log(err);
            } else {
                //逐行读取csv文件
                lineReader.eachLine('./data/customers.csv', function (line, last) {
                    //将字符串转化为数字类型
                    var visitorId = line.split(",")[0]; // 编号
                    var visitorName = line.split(",")[1]; // 游客名
                    var orderTime = line.split(",")[2]; // 下单时间
                    var moveinTime = line.split(",")[3]; // 入住时间
                    var visitorPlace = line.split(",")[4]; // 
                    var roomNum = line.split(",")[5]; // 房间号
                    var uid = line.split(",")[6]; // 唯一id
                    //指定一条记录的格式
                    var json = {
                        uid,
                        visitorId,
                        visitorName,
                        orderTime,
                        moveinTime,
                        visitorPlace,
                        roomNum
                    };
                    //存入数据库
                    collection.insert(json, { safe: true }, function (err, result) {
                        console.log(result);
                    });
                })
            }
        });
    } else {
        console.log(err);
    }
});