

function dragVerify(opt) {
    //默认参数
    let defualt = {
        ele: '#box',
        leftId: '#box-left'
    }
    //转换
    Object.assign(defualt, opt);
    //获取节点
    let box = document.querySelector(defualt.ele);
    let boxLeft = document.querySelector(defualt.leftId);
    let cbtn = document.querySelector(defualt.cbtn);
    //鼠标按下
    boxLeft.onmousedown = function (ev) {
        //获取鼠标的初始值
        let iw = ev.offsetX;
        //鼠标移动
        boxLeft.onmousemove = function (ev) {
            let disX = ev.clientX - iw;
            if (disX <= 0) {
                disX = 0;

            } else if (disX >= box.offsetWidth - 2 * boxLeft.offsetWidth) {
                disX = box.offsetWidth - boxLeft.offsetWidth;
                boxLeft.className = 'active';
            }
            boxLeft.style.left = disX + 'px';

        }
        //鼠标抬起
        boxLeft.onmouseup = function (ev) {
            //清除
            boxLeft.onmousemove = null;
            //重新获取初始值
            let disX = ev.clientX - iw;
            if (disX <= box.offsetWidth - boxLeft.offsetWidth) {
                disX = 0;
                boxLeft.className = '';
            }
            boxLeft.style.left = disX + 'px';
        }
    }
    //重置
    cbtn.onclick = function () {
        boxLeft.className = '';
        boxLeft.style.left = 0 + 'px';
    }
}
