var mongodb = require('mongodb');
var lineReader = require('line-reader');
var server = new mongodb.Server('localhost', 27017, { auto_reconnect: true });
//连接的数据库为react
var db = new mongodb.Db('ReactProject', server, { safe: true });

db.open(function (err, db) {
    if (!err) {
        console.log('connect successful');
        // 酒店文档：店名、地址、城市、编号、房间号、下单时间、入住时间、支付价格、酒店图片地址
        // hotelId,hotelImg,price,hotelName,hotelRoad,hotelCity,roomNum,orderTime,moveinTime
        db.createCollection('hotels', { safe: true }, function (err, collection) {
            if (err) {
                console.log(err);
            } else {
                console.log('hotels进来了');
                //逐行读取csv文件
                lineReader.eachLine('./data/hotels.csv', function (line, last) {
                    //将字符串转化为数字类型
                    var hotelId = line.split(",")[0]; // 酒店编号
                    var hotelImg = line.split(",")[1]; // 酒店图片地址
                    var price = line.split(",")[2]; // 支付价格
                    var hotelName = line.split(",")[3]; // 店名
                    var hotelRoad = line.split(",")[4]; // 酒店地址
                    var hotelCity = line.split(",")[5]; // 城市
                    var roomNum = line.split(",")[6]; // 房间号
                    var orderTime = line.split(",")[7]; // 下单时间
                    var moveinTime = line.split(",")[8]; // 入住时间
                    var uid = line.split(",")[9]; // 唯一id
                    //指定一条记录的格式
                    var json = {
                        uid,
                        hotelId,
                        hotelImg,
                        price,
                        hotelName,
                        hotelRoad,
                        hotelCity,
                        roomNum,
                        orderTime,
                        moveinTime
                    };
                    console.log(json);
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