function loupeCarousel(opt) {

    let defualt = {
        ele: 'box',
        arr: ['../../src/img/xqy_img/bigimg01.png',
            '../../src/img/xqy_img/bigimg02.png',
            '../../src/img/xqy_img/bigimg03.jpg',
            '../../src/img/xqy_img/bigimg04.jpg',
            '../../src/img/xqy_img/bigimg05.jpg'
        ]
    }
    Object.assign(defualt, opt);

    var box = document.getElementById(defualt.ele);
    //  console.log(box);
    var bigTu = document.getElementsByClassName('bigTu')[0];//放大后的图
    var main = document.getElementsByClassName('main')[0];//被放大的图
    var smaller = document.getElementsByClassName('smaller')[0];
    let now = 0;
    var arr = defualt.arr;
    //渲染
    var html = arr.map(function (item) {
        return `<li><img src="${item}" alt=""></li>`;
    }).join('');

    smaller.innerHTML = html;//小图
    smaller.children[0].className = 'active';

    main.innerHTML = `<img src="${arr[now]}" alt="">
                        <div class="mask" id="mask">
                        </div>`;
    bigTu.innerHTML = `<img  class="bigImg" src="${arr[now]}" alt="">`;



    //2.鼠标移入被放大的图：放大后的图和遮罩出现;移出：隐藏;
    var mask = document.querySelector('.mask')//遮罩
    var bigImg = bigTu.querySelector('.bigImg');

    //封装
    function change(a) {
        if (a <= 0) {
            a = 0;
        }
        if (a >= arr.length) {
            a = arr.length - 1;
        }
        for (let j = 0; j < arr.length; j++) {
            smaller.children[j].className = '';
        }
        now = a;
        smaller.children[a].className = 'active';
        main.children[0].src = arr[a];
        bigImg.src = arr[a];
        //console.log(now);
        return now;
    }


    //小图切换大图,并高亮
    for (let i = 0; i < arr.length; i++) {
        smaller.children[i].onclick = function () {
            change(i);
        }
    }

    main.onmouseover = function () {
        mask.style.display = 'block';
        bigTu.style.display = 'block';
    }
    main.onmouseout = function () {
        mask.style.display = 'none';
        bigTu.style.display = 'none';
    }

    //3.鼠标在被放大的图滑动的过程：放大后的图跟着鼠标走，遮罩动了，大图跟着按照比例运动
    main.onmousemove = function (ev) {
        // console.log(ev.pageY);
        var iTop = ev.pageY - box.offsetTop - mask.offsetHeight / 2;
        var iLeft = ev.pageX - box.offsetLeft - mask.offsetWidth / 2;
        // console.log(box.offsetHeight, mask.offsetHeight);
        if (iLeft <= 0) {
            iLeft = 0;
        } else if (iLeft >= box.offsetWidth - mask.offsetWidth) {
            iLeft = box.offsetWidth - mask.offsetWidth;
        }
        if (iTop <= 0) {
            iTop = 0;
        } else if (iTop >= box.offsetHeight - mask.offsetHeight - 356) {
            iTop = box.offsetHeight - mask.offsetHeight - 356;
        }
        mask.style.left = iLeft + 'px';
        mask.style.top = iTop + 'px';
        //比例
        var sc1 = iLeft / (box.offsetWidth - mask.offsetWidth);
        var sc2 = iTop / (box.offsetHeight - mask.offsetHeight - 356);
        // console.log(scl);
        //大图放大
        bigImg.style.top = -400 * sc2 + 'px';
        bigImg.style.left = -400 * sc1 + 'px';
        // console.log(bigImg.offsetHeight * sc1);
    }

}