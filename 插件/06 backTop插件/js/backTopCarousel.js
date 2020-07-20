
function backTopCarousel(opt) {
    let defaultOpt = {
        ele: 'backTop',
        minId: 'p',
        time: '1'//秒
    };
    //转换
    Object.assign(defaultOpt, opt);
    let backTop = document.getElementById(defaultOpt.ele);
    let p = document.getElementById(defaultOpt.minId);
    let html = '';
    //可改
    for (let i = 0; i < 50; i++) {
        if (i < 10) {
            i = '0' + i;
        }
        html += `你好${i}号<br>`;
    }
    p.innerHTML = html;
    //毫秒
    let time1 = defaultOpt.time * 10;
    //隐藏滚动条
    window.onscroll = function () {
        if (window.scrollY < 400) {
            backTop.style.display = 'none'

        } else {
            backTop.style.display = 'block'
        }
    }

    //点击返回
    backTop.onclick = function () {
        let timer = setInterval(function () {
            let speed = scrollY - 20;
            if (speed == 0) {
                speed = 0;
                clearInterval(timer);
            }
            window.scrollTo(0, speed);

        }, time1);
    }
}
