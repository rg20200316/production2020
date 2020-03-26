

(function () {
    let commodityList = document.querySelector('#commodity-list');
    let more = document.querySelector("#dinaji");
    let load = document.querySelector("#load");
    let page = 1;
    let numYe = 6;

    function action() {
        // console.log(page);
        ajax({
            type: 'post',
            url: '../../api/liebiaoye.php',
            data: {
                page,
                numYe,
            },
            success: str => {
                objArr(str);
            }
        });

        // console.log(5);
        function objArr(str) {
            let arr = JSON.parse(str);
            let html = arr.list.map(function (item) {
                return ` <li class="commodity-item">
            <a class="commodity-item-link" href="###">
                <div class="item-pic">
                    <div class="pic-img">
                        <img class="lazy"
                            data-original="###"
                            alt="金士顿 DDR4 2400 8GB 台式机内存"
                            src="${item.url}">
                    </div>
                </div>
                <div class="item-info">
                    <div class="item-desc">
                        <p class="item-name">${item.name}</p>
                        <span class="item-intro">${item.intro}</span>
                    </div>
                    <div class="item-detail clearfix">
                        <div class="item-detail-left">
                            <div class="item-price">
                                <span class="xj-price"><span>￥</span><span>${item.xjPrice}</span></span>
                                <span class="yj-price"><span>¥</span><span>${item.xjPrice}</span></span>
                            </div>
                            <div class="ls-price">
                                <span>${item.lsPrice}</span>
                            </div>
                        </div>
                        <div class="item-btn">
                            <span class="item-btn-con">马上抢</span>
                        </div>
                    </div>
                </div>
                <div class="show-time">
                </div>
            </a>
        </li>`;
            }).join('');

            //渲染
            commodityList.innerHTML += html;

            //懒加载条件判断
            let sum = Math.ceil(arr.total / numYe);
            // console.log(numYe);
            if (sum != 1 && page != sum) {
                more.style.display = 'block';
            } else {
                more.style.display = 'none';
            }

            //切换加载图文
            more.onclick = function () {
                more.style.display = 'none';
                load.style.display = 'block';
                setTimeout(function () {
                    more.style.display = 'block';
                    load.style.display = 'none';
                    page++;
                    action();
                }, 300);
            }

            let showTimes = document.querySelectorAll('.commodity-item .show-time');
            // let arr3 = [];
            function timedown() {
                arr.list.map(function (item) {
                    var endtime = `${item.endt}`;
                    var end = Date.parse(endtime);
                    var nowtime = new Date();
                    var now = Date.parse(nowtime);//现在时间毫秒数
                    var dis = end - now;//总毫秒数
                    var sc = dis / 1000;//总秒数
                    var day = parseInt(sc / 24 / 3600);
                    var hours = parseInt((sc - day * 24 * 3600) / 3600);
                    var mins = parseInt((sc - day * 24 * 3600 - hours * 3600) / 60);
                    var secs = parseInt(sc - day * 24 * 3600 - hours * 3600 - mins * 60);

                    html = `<div class="item-time-con clearfix">
                        <span class="countdown">剩余：
                            <span id="day">${toDb(day)}</span>天
                            <span id="hour">${toDb(hours)}</span>时
                            <span id="minute">${toDb(mins)}</span>分
                            <span id="second">${toDb(secs)}</span>秒
                        </span>
                    </div>`;
                }).join('');

                sd();
                function sd() {
                    for (let i = 0; i < showTimes.length; i++) {
                        // showTimes[i].innerHTML = arr3[i];
                        showTimes[i].innerHTML = html;
                        // console.log(arr3[i]);
                    }

                }
            }
            // timedown();
            setInterval(timedown, 1000);
        }
    }
    action();
})();

