(function () {


    //标配*选项卡
    let spok = document.querySelector('#spok');
    let ck = document.querySelector('.ck');
    let zhankai = document.querySelector('.zhankai');
    let shouqi = document.querySelector('.shouqi');
    let canBuys = document.querySelectorAll('#zp-choose-color .can-buy');
    let listLis = document.querySelectorAll('.ck .list-li');
    // console.log(listLis);
    let isok = false;
    // 展开收起
    spok.onclick = function () {
        if (isok == false) {
            ck.style.height = '100' + 'px';
            zhankai.style.display = 'none';
            shouqi.style.display = 'block';
            isok = true;
        } else {
            ck.style.height = '35' + 'px';
            zhankai.style.display = 'block';
            shouqi.style.display = 'none';
            isok = false;
        }
    }

    for (let n = 0; n < canBuys.length; n++) {
        listLis[n].onclick = function () {
            for (let j = 0; j < canBuys.length; j++) {
                canBuys[j].parentNode.className = '';
            }
            canBuys[n].parentNode.className = 'active';
            ck.style.height = '35' + 'px';
            zhankai.style.display = 'block';
            shouqi.style.display = 'none';
        }
    }

    //颜色分类

    console
    for (let i = 0; i < canBuys.length; i++) {
        canBuys[i].onclick = function () {
            for (let j = 0; j < canBuys.length; j++) {
                canBuys[j].parentNode.className = '';
            }
            // console.log(this, 2);
            canBuys[i].parentNode.className = 'active';
        }
    }


})();
