var mongodb = require('mongodb');
var lineReader = require('line-reader');
var server = new mongodb.Server('localhost', 27017, { auto_reconnect: true });
//连接的数据库为react
var db = new mongodb.Db('ReactProject', server, { safe: true });

db.open(function (err, db) {
    if (!err) {
        console.log('connect successful');
        // 订单文档： 店名、游客名、地址、编号、房间号、下单时间、入住时间、支付价格、酒店图片地址
        // orderId,hotelImg,price,visitorName,hotelName,hotelRoad,hotelCity,roomNum,orderTime,moveinTime
        db.createCollection('orders', { safe: true }, function (err, collection) {
            if (err) {
                console.log(err);
                console.log('err进来了');
            } else {
                //逐行读取csv文件
                lineReader.eachLine('./data/orders.csv', function (line, last) {
                    //将字符串转化为数字类型
                    var orderId = line.split(",")[0]; // 序号
                    var hotelImg = line.split(",")[1]; // 酒店图路径
                    var price = line.split(",")[2]; // 支付价格
                    var visitorName = line.split(",")[3]; // 游客名
                    var hotelName = line.split(",")[4]; // 店名
                    var hotelRoad = line.split(",")[5]; // 酒店地址
                    var hotelCity = line.split(",")[6]; // 城市
                    var roomNum = line.split(",")[7]; // 房间号
                    var orderTime = line.split(",")[8]; // 下单时间
                    var moveinTime = line.split(",")[9]; // 入住时间
                    var uid = line.split(",")[10]; // 唯一id
                    //指定一条记录的格式
                    var json = {
                        uid,
                        orderId,
                        hotelImg,
                        price,
                        visitorName,
                        hotelName,
                        hotelRoad,
                        hotelCity,
                        roomNum,
                        orderTime,
                        moveinTime
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