function loupeCarousel(opt) {
    let defualt = {
        ele: 'box',
        arr: ['../img/banner1.jpg',
            '../img/banner2.jpg',
            '../img/banner3.jpg',
            '../img/banner4.jpg'
        ]
    }
    Object.assign(defualt, opt);

    var box = document.getElementById(defualt.ele);
    var bigTu = document.getElementsByClassName('bigTu')[0];//放大后的图
    var main = document.getElementsByClassName('main')[0];//被放大的图
    var smaller = document.getElementsByClassName('smaller')[0];
    var prev = box.getElementsByClassName('prev')[0];
    var next = box.getElementsByClassName('next')[0];
    let now = 0;
    var arr = defualt.arr;
    //渲染
    var html = arr.map(function (item) {
        return `<li><img src="${item}" alt=""></li>`;
    });
    smaller.innerHTML = html;//小图
    smaller.children[0].className = 'active';
    main.innerHTML = `<img src="${arr[now]}" alt="">
                        <div class="mask" id="mask">
                        </div>`;
    bigTu.innerHTML = `<img  class="bigImg" src="${arr[now]}" alt="">`;

    //2.鼠标移入被放大的图：放大后的图和遮罩出现;移出：隐藏
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

    //前一张
    prev.onclick = function () {
        now--;
        let n = change(now);
        // console.log(n);
        if (n >= arr.length) {
            n = arr.length - 1;
        }

    }
    //下一张
    next.onclick = function () {
        now++;
        let n = change(now);
        if (n >= arr.length) {
            //console.log(arr.length);
            n = arr.length - 2;
        }
    }

    //3.鼠标在被放大的图滑动的过程：放大后的图跟着鼠标走，遮罩动了，大图跟着按照比例运动
    main.onmousemove = function (ev) {
        var iTop = ev.pageY - box.offsetTop - mask.offsetHeight / 2;
        var iLeft = ev.pageX - box.offsetLeft - mask.offsetWidth / 2;
        if (iLeft <= 0) {
            iLeft = 0;
        } else if (iLeft >= box.offsetWidth - mask.offsetWidth) {
            iLeft = box.offsetWidth - mask.offsetWidth;
        }
        if (iTop <= 0) {
            iTop = 0;
        } else if (iTop >= box.offsetHeight - mask.offsetHeight - 100) {
            iTop = box.offsetHeight - mask.offsetHeight - 100;
        }
        mask.style.left = iLeft + 'px';
        mask.style.top = iTop + 'px';
        //比例
        var sc1 = iLeft / (box.offsetWidth - mask.offsetWidth);
        var sc2 = iTop / (box.offsetHeight - mask.offsetHeight - 100);
        //大图放大
        bigImg.style.top = -400 * sc2 + 'px';
        bigImg.style.left = -400 * sc1 + 'px';
    }
}