function upWindowsCarousel(opt) {
    let defualt = {
        ele: '#zhu',
        minId: '#upWindows',
        closeName: '.close',
        markId: '#mark'
    }
    Object.assign(defualt, opt);

    //获取节点
    let zhu = document.querySelector(defualt.ele);
    let upWindows = document.querySelector(defualt.minId);
    let close = document.querySelector(defualt.closeName);
    let mark = document.querySelector(defualt.markId);
    //封装
    function sizeCenter() {
        let Top = (window.innerHeight - upWindows.offsetHeight) / 2;
        let Left = (window.innerWidth - upWindows.offsetWidth) / 2;
        upWindows.style.top = Top + 'px';
        upWindows.style.left = Left + 'px';
        upWindows.style.display = 'block';
        mark.style.display = 'block';
    }
    //点击是显示弹窗
    zhu.onclick = function () {
        sizeCenter();
    }
    //点击 X 时隐藏
    close.onclick = function () {
        upWindows.style.display = 'none';
        mark.style.display = 'none';
    }
    //点击遮罩时隐藏
    mark.onclick = function () {
        upWindows.style.display = 'none';
        mark.style.display = 'none';
    }
    //随浏览器窗口大小的改变而改变
    onresize = function () {
        sizeCenter();
    }

}
