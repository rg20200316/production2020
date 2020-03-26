//js库文件：仿jq，这里提供一些方法，以后可以反复调用，提高我们开发效率

/*
 * @Description: 封装一个函数可以实现下拉菜单的显示隐藏(点击版)
 * @Author: 大哲
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */

function hideShow(btn, ele) {//要参数：参数一：点击的对象；参数二：显示隐藏的对象
    btn.onclick = function () {
        if (ele.style.display == 'block') {//null == 'block'  'block'== 'block' 'none'=='block'
            ele.style.display = 'none';
        } else {
            //第一次：显示
            ele.style.display = 'block';
        }
    }
}

/*
 * @Description: 封装一个函数可以生成任意范围内的随机数
 * @Author: 大哲
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */

function ranNum(min, max) {
    //得到一个min到max之间的随机数：极限的时候,Math.random()为零的时候，最小的时候;Math.random()是1的时候是最大的时候
    return parseInt(Math.random() * (max - min + 1)) + min;
}

//封装函数过滤敏感词
function filter(str) {
    var arr = ['fuck', '操', '小学生', '妈蛋', '反清复明', '金正恩', '垃圾'];
    arr.forEach(function (item) {
        var reg = new RegExp(item, 'ig');//规则
        str = str.replace(reg, '***');
    });
    return str;
}

//封装函数：参数转成对象
function strToObj(str) {
    var obj = {};
    var arr1 = str.split('&');//["name=apple", "price=8999"]
    for (var i in arr1) {
        var arr2 = arr1[i].split('=');
        obj[arr2[0]] = arr2[1];
    }
    return obj;
}

function objToStr(obj) {
    //对象转成参数   {name:apple,price:8999}  name=apple&price=8999
    var str = '';
    for (var key in obj) {
        str += key + '=' + obj[key] + '&';//name=apple&price=8999&
    }
    return str.slice(0, -1);
}

function toDb(num) {//补零函数
    if (num < 10) {
        return '0' + num;
    } else {
        return '' + num;
    }
}

function setTime(num) {
    //毫秒数->天时分秒
    var sec = parseInt(num / 1000);//秒数
    var secs = sec % 60;//秒
    var min = parseInt(sec / 60) % 60;//分
    var hour = parseInt(sec / 60 / 60) % 24;//小时
    var day = parseInt(sec / 60 / 60 / 24);//天数

    // console.log(day, hour, min, secs);
    // return secs; //不同出现多个return
    // return min;

    return { //需要返回多个数字的时候用对象来传
        days: day,
        hours: hour,
        mins: min,
        secs: secs
    };
}

function getid(id) {//通过id查找元素
    return document.getElementById(id);
}

//兼容：面试题
function firstChild(ele) {
    //找到第一个孩子
    if (ele.firstElementChild) {
        //标准浏览器下
        return ele.firstElementChild;
    } else {
        //IE678
        return ele.firstChild;
    }
}

//仿jq的css()方法，设置和获取样式
//css(box,'width') 获取box的width样式
//css(box,'height','200px') 给box设置样式

function css() {
    if (arguments.length == 2) {
        //获取样式
        if (getComputedStyle(arguments[0], false)) {
            //标准浏览器
            var attr = arguments[1];
            return getComputedStyle(arguments[0], false)[attr];
        } else {
            //ie8-
            var attr = arguments[1];
            return arguments[0].currentStyle[attr];
        }
    } else if (arguments.length == 3) {
        //设置样式 box.style.display = 'none'
        var attr = arguments[1];
        arguments[0].style[attr] = arguments[2];
    }
}

//兼容处理  bind() 仿jq：绑定事件
function bind(ele, type, fn) {
    //ele:元素 type：事件名 fn:回调函数
    if (ele.addEventListener) {
        //标准浏览器
        ele.addEventListener(type, fn, false);
    } else {
        //ie8-
        ele.attachEvent('on' + type, fn);
    }
}

//封装正则大全函数

var checkReg = {
    email: function (str) {//邮箱验证
        var reg = /^[\w#$!\-]+@[\w#$!\-]+\.[a-zA-Z]+$/;
        return reg.test(str);
    },
    tel: function (str) {//手机号码
        var reg = /^1[3-9]\d{9}$/;
        return reg.test(str);
    }
}

//封装深度拷贝
function deepClone(obj) {
    var str = JSON.stringify(obj);
    return JSON.parse(str);
}

/*
	运动框架封装：startMove()过渡    jq animate()
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */

function startMove(obj, json, fnend) {

    clearInterval(obj.timer); //防止定时器叠加
    obj.timer = setInterval(function () {

        var istrue = true;

        //1.获取属性名，获取键名：属性名->初始值
        for (var key in json) { //key:键名   json[key] :键值
            //			console.log(key); //width heigth opacity
            var cur = 0; //存初始值

            if (key == 'opacity') { //初始值
                cur = css(obj, key) * 100; //透明度
            } else {
                cur = parseInt(css(obj, key)); // 300px  300  width heigth borderwidth px为单位的

            }

            //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
            //距离越大，速度越大,下面的公式具备方向
            var speed = (json[key] - cur) / 6; //出现小数
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

            //保证上一个属性全部都达到目标值了
            if (cur != json[key]) { //width 200 heigth 400
                istrue = false; //如果没有达到目标值，开关false
            } else {
                istrue = true; //true true
            }

            //3、运动
            if (key == 'opacity') {
                obj.style.opacity = (cur + speed) / 100; //0-1
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'; //0-100
            } else {
                obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
            }

        }

        //4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
        if (istrue) { //如果为true,证明以上属性都达到目标值了
            clearInterval(obj.timer);
            if (fnend) { //可选参数的由来
                fnend();
            }
        }

    }, 30); //obj.timer 每个对象都有自己定时器

}

/*
           仿jq的ajax封装：
               ajax({
                   type : 'get', 必填
                   url : 接口,必填
                   data : { //选填
                       name ：'蛋黄酥',
                       price : '39.9'
                   },
                   asyn : true,可选
                   success : function(str) {
                       //成功的回调
                   },
                   error : function(status) {//可选的
                       //失败的回调
                   }

               });
       */

function ajax(opt) {
    //默认参数
    let defaultOpt = {
        data: '',
        asyn: true,
        error: null
    }

    //替补方案
    Object.assign(defaultOpt, opt);//用defaultOpt

    //1.创建对象
    let xhr = new XMLHttpRequest();

    //2.写好参数，准备工作  open()
    //防止缓存
    if (defaultOpt.type.toLowerCase() == 'get') {
        //get请求
        if (defaultOpt.data) {
            //有数据，把数据拼接在url
            defaultOpt.url = defaultOpt.url + '?time=' + new Date() + '&' + objToStr(defaultOpt.data);
        }
        xhr.open('get', defaultOpt.url, defaultOpt.asyn);
        xhr.send(null);
    } else {
        //post请求
        xhr.open('post', defaultOpt.url + '?time=' + new Date(), defaultOpt.asyn);
        let data = objToStr(defaultOpt.data);
        xhr.setRequestHeader('content-type', "application/x-www-form-urlencoded");//请求头
        xhr.send(data);
    }

    //4.接收数据
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 304) {
                //成功  
                defaultOpt.success(xhr.responseText);//实参
            } else {
                //失败
                if (defaultOpt.error) {
                    defaultOpt.error(xhr.status);//实参：http状态码
                }
            }
        }
    }

}

//获取cookie
function getcookie(key) {
    let str = document.cookie;//username=admin; age=18
    let arr = str.split('; ');
    for (let item of arr) {
        let arr2 = item.split('=');
        if (key == arr2[0]) {
            return arr2[1];
        }
    }
}

//设置cookie
function setcookie(key, val, iday) {
    let now = new Date();
    now.setDate(now.getDate() + iday);
    document.cookie = key + '=' + val + ';expires=' + now + ';path=/';
}

//删除
function removeCookie(key) {
    setcookie(key, '', -1);
}

function getTimeSec(secs) {
    let time = new Date(secs * 1000);
    // console.log(time);
    let year = time.getFullYear();
    let mon = time.getMonth() + 1;
    let date = time.getDate();
    let hours = time.getHours();
    let mins = time.getMinutes();
    let sec = time.getSeconds();
    return {
        year,
        mon,
        date,
        hours,
        mins,
        sec
    }
}