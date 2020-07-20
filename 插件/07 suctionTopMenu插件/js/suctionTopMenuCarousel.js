function suctionTopMenuCarousel(opt) {
    let defualt = {
        // ele: 'suctionTopMenu',
        minId: 'Menu-list',//菜单栏
        className: 'fix'//吸顶样式
    }
    Object.assign(defualt, opt);

    // let suctionTopMenu = document.getElementById(defualt.ele);
    let MenuList = document.getElementById(defualt.minId);
    let menuTop = MenuList.offsetTop;
    // console.log(MenuList);

    window.onscroll = function () {
        console.log('top:' + MenuList.offsetTop);

        if (scrollY >= menuTop) {
            MenuList.className = defualt.className;
        }
        else {
            MenuList.className = '';
        }
    }
}