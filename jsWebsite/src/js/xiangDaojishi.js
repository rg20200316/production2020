(function () {
    let groupOverTime = document.querySelector('.group-over-time');
    let endTimeNum = groupOverTime.getAttribute('end-time');

    function showTime() {
        // var end = Date.parse('xxx');//填写截止时间
        var nowtime = new Date();
        var now = Date.parse(nowtime);//现在时间毫秒数
        // var dis = endTimeNum - now / 1000;//总毫秒数
        var sc = endTimeNum - now / 1000;//总秒数
        var day = parseInt(sc / 24 / 3600);
        var hours = parseInt((sc - day * 24 * 3600) / 3600);
        var mins = parseInt((sc - day * 24 * 3600 - hours * 3600) / 60);
        var secs = parseInt(sc - day * 24 * 3600 - hours * 3600 - mins * 60);

        groupOverTime.innerHTML = `距结束仅剩<span>${toDb(day)}天</span>
                                        <span class="time-num">${toDb(hours)}</span> :
                                        <span class="time-num">${toDb(mins)}</span> :
                                        <span class="time-num">${toDb(secs)}</span>
                                    `;


    }

    showTime();
    setInterval(showTime, 1000);

})();
