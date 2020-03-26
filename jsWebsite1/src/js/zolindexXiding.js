
let suctionTip = document.querySelector('#suction-tip');
let sortsList = document.querySelectorAll('#suction-tip .sorts li');
// 今日团 排他
for (let i = 0; i < sortsList.length; i++) {
    sortsList[i].onmouseover = () => {
        for (let j = 0; j < sortsList.length; j++) {
            sortsList[j].className = "";
        }
        sortsList[i].className = 'active';
    }
}
//
let widget = document.querySelector('#widget');
let goUp = document.querySelector('#go-up');
let suctionTipTop = suctionTip.offsetTop;
// console.log(suctionTipTop);

window.onscroll = function () {
    let scrollT = scrollY;
    // console.log(scrollT);
    //吸顶
    if (scrollT >= suctionTipTop) {
        suctionTip.className = 'flxe';
        suctionTip.style.top = '-2%';
        suctionTip.style.width = 1214.4 + 'px';
    }
    if (scrollT < suctionTipTop) {
        suctionTip.className = '';
        suctionTip.style.width = 1214 + 'px';
    }
    //显示按钮
    if (window.scrollY >= suctionTipTop) {//800
        widget.style.opacity = 1;
    } else {
        widget.style.opacity = 0;
    }

}
//点击时返回顶部
goUp.onclick = function () {
    // let scrollT2 = window.scrollY;
    window.scrollTo(0, 0);//瞬间回到顶部
    // let topTimer = setInterval(function () {
    //缓慢回到顶部
    //     if (scrollT2 >= 0) {
    //         //scrollTop每30毫秒自减100px
    //         scrollT2 -= 100;
    //         window.scrollTo(0, scrollT2)
    //     } else {
    //         //清除计时器
    //         clearInterval(topTimer);
    //     }
    // }, 70);
}

