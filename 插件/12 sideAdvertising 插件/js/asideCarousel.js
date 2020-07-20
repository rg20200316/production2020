

function asideCarousel(opt) {

    let defaultOpt = {
        //默认参数
        right: -210
    }

    //有配置用配置，没有配置用默认
    Object.assign(defaultOpt, opt);

    let sideRight = document.getElementById(defaultOpt.ele);//右侧边栏主体

    sideRight.onmouseover = function () {
        startMove(sideRight, { 'right': 0 });
    }

    sideRight.onmouseout = function () {
        startMove(sideRight, { 'right': defaultOpt.right });
    }

}
