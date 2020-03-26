function mainHeadeCaroust(opt) {
    let dafulateOpt = ({
        ele: 'banner1',
        ul: 'ul',
        prev: 'btn-prev',
        next: 'btn-next',
        page: 'page',
    });
    Object.assign(dafulateOpt, opt);

    let banner = document.getElementById(dafulateOpt.ele);
    let ul = banner.getElementsByTagName(dafulateOpt.ul)[0];
    let arr = dafulateOpt.arr;
    let page = banner.getElementsByClassName(dafulateOpt.page)[0];
    let btnPrev = banner.getElementsByClassName(dafulateOpt.prev)[0];
    let btnNext = banner.getElementsByClassName(dafulateOpt.next)[0];
    let timer = null;
    let now = 0;//在可视区中，对应li下标

    //1.渲染数据到页面:li和焦点(分页)
    let html = '';
    let strSpan = '';
    arr.forEach((item, index) => {
        html += `<li data-index="${index}"><img src="${item}"></li>`;
        strSpan += `<span class="" data-id="${index + 1}"></span>`;
    });

    ul.innerHTML = html;
    page.innerHTML = strSpan;
    page.children[0].classList.add('active');

    //2.把第一张复制到末尾
    let firstLi = ul.children[0].cloneNode(true);
    ul.appendChild(firstLi);

    //3.ul的总宽：图片的个数 * 图片宽度
    let iw = ul.children[0].offsetWidth;
    // console.log(iw);
    ul.style.width = ul.children.length * iw + 'px';

    //4.开启定时器：自动轮播
    timer = setInterval(next, 2000);

    function next() {//下一张
        now++;
        tab();
    }

    function prev() {//下一张
        now--;
        tab();
    }

    //切换图片
    function tab() {
        if (now > ul.children.length - 1) {
            now = 1;//回到第二张
            ul.style.left = 0;
        }
        if (now < 0) {
            now = ul.children.length - 2;
            ul.style.left = (ul.children.length - 1) * -iw + 'px';//往右边走
        }
        startMove(ul, { 'left': now * -iw });
        light();
    }

    //焦点跟随
    function light() {
        //排他
        for (let el of page.children) {
            el.classList.remove('active');
        }
        let index = ul.children[now].dataset.index;
        // console.log(page.children[index]);
        page.children[index].classList.add('active');
    }

    //5.点击上下按钮可以切换图片，鼠标移入停止运动
    banner.onmouseover = () => {
        clearInterval(timer);
        btnPrev.style.display = 'block';
        btnNext.style.display = 'block';
    }
    //鼠标移出时就继续运动
    banner.onmouseout = () => {
        clearInterval(timer);
        timer = setInterval(next, 2000);//2秒切换一个图片
        btnPrev.style.display = 'none';
        btnNext.style.display = 'none';
    }
    //鼠标移入时，方向键背景色改变
    btnPrev.onmouseover = () => {
        btnPrev.style.backgroundColor = '#c00';
        btnPrev.style.opacity = '0.3';
    }
    btnNext.onmouseover = () => {
        btnNext.style.backgroundColor = '#c00';
        btnNext.style.opacity = '0.3';
    }
    //鼠标移出时，方向键背景色恢复
    btnPrev.onmouseout = () => {
        btnPrev.style.backgroundColor = '';
        btnPrev.style.opacity = '';
    }
    btnNext.onmouseout = () => {
        btnNext.style.backgroundColor = '';
        btnNext.style.opacity = '';
    }


    //上一张
    btnPrev.onclick = () => {
        prev();
    }

    //下一张
    btnNext.onclick = () => {
        next();
    }

    //4.点击焦点切换图片
    page.onmouseover = ev => {
        if (ev.target.tagName == 'SPAN') {
            now = ev.target.dataset.id - 1;
            // console.log(ev.target.dataset.id);
            tab();
        }
    }
}