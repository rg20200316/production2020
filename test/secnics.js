var mongodb = require('mongodb');
var lineReader = require('line-reader');
var server = new mongodb.Server('localhost', 27017, { auto_reconnect: true });
//连接的数据库为react
var db = new mongodb.Db('ReactProject', server, { safe: true });

db.open(function (err, db) {
    if (!err) {
        console.log('connect successful');
        // 景点信息： 游客名、序号、景点名、地址、景点图片地址
        // visitorId,visitorName,visitorCity,moveinTime,visitorPlace,placeImg,uid

        db.createCollection('secnics', { safe: true }, function (err, collection) {
            if (err) {
                console.log(err);
            } else {
                //逐行读取csv文件
                lineReader.eachLine('./data/scenics.csv', function (line, last) {
                    //将字符串转化为数字类型
                    var visitorId = line.split(",")[0]; // 序号
                    var visitorName = line.split(",")[1]; // 游客名、
                    var visitorCity = line.split(",")[2]; // 地址、
                    var moveinTime = line.split(",")[3]; // 时间
                    var visitorPlace = line.split(",")[4]; // 景点名、
                    var placeImg = line.split(",")[5]; // 景点图片地址
                    var uid = line.split(",")[6]; // 唯一id

                    //指定一条记录的格式
                    var json = {
                        uid,
                        visitorId,
                        visitorName,
                        visitorCity,
                        moveinTime,
                        visitorPlace,
                        placeImg
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