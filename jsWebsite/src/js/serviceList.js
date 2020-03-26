(function () {

    let serviceList = document.querySelector('.zol-main-header .service-list');
    let arr = [
        {
            className: 'icon-zheng',
            name: '正品保障'
        },
        {
            className: 'icon-pei',
            name: '先行赔付'
        },
        {
            className: 'icon-piao',
            name: '发票保障'
        },
        {
            className: 'icon-24',
            name: '24小时'
        },
        {
            className: 'icon-shuangxiangjiantou',
            name: '无忧退货'
        }
    ]
    let html = '';
    html = arr.map(function (item) {
        return `<li>
                    <i class="iconfont ${item.className}"></i>
                    <span class="servive-class">${item.name}</span>
                </li>`;
    }).join('');
    serviceList.innerHTML = html;
})();