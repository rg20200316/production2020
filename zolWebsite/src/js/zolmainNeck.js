ajax({
    type: 'get',
    url: '../../api/zolList.php',
    data: {
        num: 2
    },
    success: function (str) {
        //成功的回调
        zolMainNeck(str);
        // console.log(str);
    }
});

function zolMainNeck(str) {
    let aBigImgs = JSON.parse(str);
    let playImages = document.querySelector('.main-lunbo');
    let prevBtn = document.querySelector('.main-lunbo .prev');
    let nextBtn = document.querySelector('.main-lunbo .next');
    let smallUl = document.querySelector('.main-lunbo .small');//ul
    // console.log(smallUl);
    let html = '';
    aBigImgs.forEach((item) => {
        //渲染
        html += `<li class="bx-clone">
                    <div class="pic">
                        <a href="${item.piceHref}target="_blank">
                            <img width="201" height="201" src="${item.url}"
                                alt="【顺丰包邮】三星 Galaxy A9s (SM-A9200) 后置四摄  6运行全网通4G 鱼子黑 行货128GB">
                            <span class="ls-price">${item.liPrice}</span>
                        </a>
                    </div>
                    <div class="title">
                        <a href="${item.titleHref}" target="_blank">${item.title}</a>
                    </div>
                    <div class="price">
                        ${item.priceN2}<span class="original">${item.priceN2}</span>
                    </div>
                    <div class="shop-name">
                        <a href="${item.shopNameHref}" target="_blank">${item.shopName}</a>
                    </div>
                    <div class="countdown">
                        <span>剩余：</span>
                        <em id="day">${item.contdDay}</em>天
                        <em id="hour">${item.contdHour}</em>时
                        <em id="minute">${item.contdMinute}</em>分
                        <em id="second">${item.contdSecond}</em>秒
                    </div>
                    <a class="price-btn" href="###">${item.btnName}</a>
                </li>`;
    });
    smallUl.innerHTML = html;

    //可视区的那张的下标
    let now = 0;
    // console.log(smallUl);
    let iW = smallUl.children[0].offsetWidth;

    // //小图水平方向平铺
    smallUl.style.width = iW * smallUl.children.length + 'px';

    //2.自动轮播：
    timer = setInterval(next, 2000);

    function next() {
        now++;
        tab();
    }

    function prev() {
        now--;
        tab();
    }

    function tab() {//切换到第now张图
        if (now > aBigImgs.length - 1) {//临界值的判断
            now = 0;
        } else if (now < 0) {
            now = aBigImgs.length - 1;
        }
        // console.log(now);

        //图片运动
        startMove(smallUl, { 'left': -iW * now });
        let sum = 3;
        if (now >= smallUl.children.length - 3) {
            // console.log(1);
            sum--;
            if (sum <= 0) {
                sum = 0;
            }
            startMove(smallUl, { 'right': -iW * sum });
        }
        // //图片高亮
        // //排他
        for (let ele of smallUl.children) {
            ele.style.borderColor = '#999';
        }
        smallUl.children[now].style.borderColor = 'red';
    }

    //3.点击左右按钮：切换上下张
    playImages.onmouseover = () => {
        clearInterval(timer);
    }

    playImages.onmouseout = () => {
        clearInterval(timer);
        timer = setInterval(next, 2000);
    }

    prevBtn.onclick = () => {
        //上一张
        prev();
    }

    nextBtn.onclick = () => {
        //下一张
        next();
    }
}

