function imgCarousel(opt) {

    var defaultOpt = {
        //默认参数
        iw: 500, //宽度 (可选)
        ih: 300,//高度 (可选)
        time: 2,//图片切换时间(可选)
        btnType: true
    }

    //有配置用配置，没有配置用默认
    Object.assign(defaultOpt, opt);//用默认参数 ：defaultOpt

    /*
        需求：轮播图
            * 渲染生成图片列表
            * 所有的图片放在右侧，第一张图放在可视区
            * 焦点(幻灯片)动态生成（根据图片的个数来创建）
            * 开启定时器：自动轮播
            * 点击左右按钮：切换到上下张
            * 点击焦点：切换到对应的图片
    */

    var box = document.getElementById(defaultOpt.ele);
    var ul = box.getElementsByTagName('ul')[0];

    //设置尺寸
    box.style.width = defaultOpt.iw + 'px';
    box.style.height = defaultOpt.ih + 'px';

    //渲染生成图片列表
    var strList = defaultOpt.datalist.map(function (item) {
        return `<li><img src="${item}" alt=""></li>`;
    }).join('');
    ul.innerHTML = strList;//渲染

    //查找li节点
    var imglist = box.getElementsByTagName('li');
    var light = box.getElementsByClassName('light')[0];
    var prevBtn = box.getElementsByClassName('prev')[0];
    var nextBtn = box.getElementsByClassName('next')[0];
    var iw = imglist[0].offsetWidth;
    var timer = null;
    var now = 0;//可视区里面图片的下标


    //1.所有的图片放在右侧，第一张图放在可视区
    //2.焦点(幻灯片)动态生成（根据图片的个数来创建）
    var html = '';
    for (var i = 0; i < imglist.length; i++) {
        imglist[i].style.left = iw + 'px';
        html += `<span>${i + 1}</span>`;
    }
    imglist[0].style.left = 0;
    light.innerHTML = html;
    light.children[0].className = 'active';

    //3.开启定时器：自动轮播
    function lightMove() {//焦点
        for (var i = 0; i < light.children.length; i++) {
            light.children[i].className = ''; //排他
        }
        light.children[now].className = 'active';
    }
    //下一张
    function next() {
        //旧图挪走，新图进场
        startMove(imglist[now], { 'left': -iw });
        //新图:快速放在右侧，再挪到可视区
        now++;
        if (now > imglist.length - 1) {//临界值
            now = 0;
        }
        imglist[now].style.left = iw + 'px';//候场
        startMove(imglist[now], { 'left': 0 });
        lightMove();//焦点跟随
    }
    //上一张
    function prev() {
        //旧图挪走，新图进场
        startMove(imglist[now], { 'left': iw });
        //新图:快速放在左侧，再挪到可视区
        now--;
        if (now < 0) {//临界值
            now = imglist.length - 1;
        }
        imglist[now].style.left = -iw + 'px';//候场
        startMove(imglist[now], { 'left': 0 });
        lightMove();//焦点跟随
    }
    timer = setInterval(next, defaultOpt.time * 1000);//每隔两秒切换一个图片

    //4.点击左右按钮：切换到上下张
    //鼠标移入停止，移出要继续运动
    box.onmouseover = function () {
        //移入时，先关闭定时器，避免定时器叠加而出现bug
        clearInterval(timer);
        if (!defaultOpt.btnType) {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
        }
    }

    box.onmouseout = function () {
        //移出时，关闭定时器
        clearInterval(timer);
        //每隔两秒切换一个图片
        timer = setInterval(next, defaultOpt.time * 1000);
        if (!defaultOpt.btnType) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
    }

    //判断按钮是否一开始显示隐藏
    if (defaultOpt.btnType) {//true
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }
    //上一张
    prevBtn.onclick = function () {
        prev();
    }
    //下一张
    nextBtn.onclick = function () {
        next();
    }

    //5.点击焦点：切换到对应的图片
    light.onclick = function (ev) {
        if (ev.target.tagName.toLowerCase() == 'span') {
            // console.log(ev.target.innerHTML);
            var index = ev.target.innerHTML - 1;
            if (index > now) {
                //新图从右边切入
                startMove(imglist[now], { 'left': -iw });
                imglist[index].style.left = iw + 'px';
                startMove(imglist[index], { 'left': 0 });
            }
            if (index < now) {
                //新图从左边切入
                startMove(imglist[now], { 'left': iw });
                imglist[index].style.left = -iw + 'px';
                startMove(imglist[index], { 'left': 0 });
            }
            now = index;
            //焦点跟随
            lightMove();
        }
    }
}

