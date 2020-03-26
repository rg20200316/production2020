

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
}
