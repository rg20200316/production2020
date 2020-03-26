(function () {
    let celanFoot = document.querySelector('.celan-foot');
    let dingdan = document.querySelector('.dingdan');
    let zuji = document.querySelector('.zuji');
    let gouwuche = document.querySelector('.gouwuche');
    let youhuijuan = document.querySelector('.youhuijuan');
    let dingSp = document.querySelector('.dingdan span');
    let zujiSp = document.querySelector('.zuji span');
    let gouwucheSp = document.querySelector('.gouwuche span');
    let youhuijuanSp = document.querySelector('.youhuijuan span');

    dingdan.onmouseover = function () {
        startMove(dingSp, { 'width': 60 });
    }
    dingdan.onmouseout = function () {
        startMove(dingSp, { 'width': 0 });
    }
    zuji.onmouseover = function () {
        startMove(zujiSp, { 'width': 60 });
    }
    zuji.onmouseout = function () {
        startMove(zujiSp, { 'width': 0 });
    }
    gouwuche.onmouseover = function () {
        startMove(gouwucheSp, { 'width': 60 });
    }
    gouwuche.onmouseout = function () {
        startMove(gouwucheSp, { 'width': 0 });
    }
    youhuijuan.onmouseover = function () {
        startMove(youhuijuanSp, { 'width': 60 });
    }
    youhuijuan.onmouseout = function () {
        startMove(youhuijuanSp, { 'width': 0 });
    }

    //瞬间回到顶部
    celanFoot.onclick = () => {
        window.scrollTo(0, 0);
    }
})();