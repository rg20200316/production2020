//获取和设置CSS样式
function css() {
    if (arguments.length == 2) {//参数的个数
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


//运动
function startMove(obj, json, fnend) {
    clearInterval(obj.timer); //防止定时器叠加
    obj.timer = setInterval(function () {
        var istrue = true;
        //1.获取属性名，获取键名：属性名->初始值
        for (var key in json) { //key:键名   json[key] :键值
            var cur = 0; //存初始值
            //获取样式
            if (key == 'opacity') { //初始值
                cur = css(obj, key) * 100; //透明度
            } else {
                cur = parseInt(css(obj, key));
                // 300px  300  width heigth borderwidth px为单位的
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