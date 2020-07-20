//封装购物车插件

function shopTroll(opt) {
    //默认参数
    shopOpt = {
        ele: 'box',
        eleCl: 'content-con',
    }
    Object.assign(shopOpt, opt);

    var box = document.getElementById(shopOpt.ele);
    var contentCon = box.getElementsByClassName(shopOpt.eleCl)[0];
    var html = '';
    var str = shopOpt.imgList;
    for (let i = 0; i < str.length; i++) {
        html += `<li class="listli ${i}${i + 1}">
                    <label><input type="checkbox" class="goods-list-item" style="margin-left: 50px;
                    margin-top:50px;"></label>
                    <div class="goods-image-column">
                        <img class = "goods-image" src="${shopOpt.imgList[i]}" style="width: 100px; height: 100px;">
                        <span id="goods-info" class="jiesao">${shopOpt.introduce[i]}</span>
                    </div>
                    <span class="title">${shopOpt.title[i]}</span>
                    <div class="goods-price" style="color:red;">
                        <span>￥</span>
                        <span class="single-price">${shopOpt.goodsPrice[i]}</span>
                    </div>
                    <div class="goods-counts">
                        <div class="input-group">
                            <div class="input-btn" style="margin-left: 30px;">
                                <button type="button" class="car-decrease" style="margin-left: 20px;">-</button>
                            </div>
                            <div><input style="width:50px;height:20px;line-height:20px;display:block;margin-left:10px;"
                                    data-kucun="${shopOpt.kucun[i]}" class="goods-count" type="text" value="1"></div>
                            <div class="input-btn">
                                <button type="button" class="car-add">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="goods-money-count" style="color:red;">
                        <span>￥</span>
                        <span class="single-total">${shopOpt.singleTotal[i]}</span>
                    </div>
                    <div class="goods-operate">
                        <button type="button" class="item-delete">删除</button>
                    </div>
                </li>`
    }
    contentCon.innerHTML = html;//渲染

    //实现数量的加减
    var checkAll = document.getElementById('check-all-bottom'); //全选
    var goodList = document.getElementsByClassName('goods-list-item');
    var carAdd = document.getElementsByClassName('car-add'); //加
    var carCut = document.getElementsByClassName('car-decrease'); //减
    var goodsCount = document.getElementsByClassName('goods-count'); //数量（库存）
    var itemdelete = document.getElementsByClassName('item-delete'); //删除单行的节点
    var dataList = document.getElementsByClassName('listli'); //li的class名

    //计算小计
    var singleTotal = document.getElementsByClassName('single-total');
    var singlePrice = document.getElementsByClassName('single-price');

    //结算
    var seCount = document.querySelector('#seCount');
    var seMoney = document.querySelector('#seMoney');
    var jiesuan = document.querySelector('#jiesuan');
    addIndex(); //找到节点后绑定索引

    //改变购买量
    function changeSum(num, now) {
        var kucun = goodsCount[now].dataset.kucun;
        if (num < 1) {
            num = 1;
        } else if (num >= kucun) {
            num = kucun;
            // console.log(num);
        }
        goodsCount[now].value = num;
        singleTotal[now].innerHTML = singlePrice[now].innerHTML * num;
        total();
    }

    //绑定索引
    function addIndex() {
        for (let i = 0; i < carAdd.length; i++) {
            carAdd[i].index = i; //绑定索引
            carCut[i].index = i;
            goodsCount[i].index = i;
            itemdelete[i].index = i;
        }

    }
    //库存的加减购买
    for (let i = 0; i < carAdd.length; i++) {
        //加
        carAdd[i].onclick = function () {
            var num = goodsCount[this.index].value;
            num++;
            changeSum(num, this.index);
        }
        //减
        carCut[i].onclick = function () {
            var num = goodsCount[this.index].value;
            num--;
            changeSum(num, this.index);
        }
        //控制输入的数量不超过库存
        goodsCount[i].oninput = function () {
            var num = this.value;
            changeSum(num, this.index);
        }

        //删除单行
        itemdelete[i].onclick = function () {
            var res = confirm('确定删除？');
            if (res) {
                contentCon.removeChild(dataList[this.index]);
            }
            total();
            addIndex(); //删除后也要绑定索引重置
        }
    }

    //全选
    checkAll.onclick = function () {
        for (let i = 0; i < goodList.length; i++) {
            goodList[i].checked = checkAll.checked;
        }
        total();
    }

    //点击复选框反控制全选
    function isCheck() {
        var num = 0; //计数器
        var arr = []; //声明一个空数组存下标
        for (let i = 0; i < goodList.length; i++) {
            if (goodList[i].checked) { //
                num++;
                arr.push(i); //空数组存下标
            }
        }
        if (num == goodList.length && num != 0) {
            checkAll.checked = true;
        } else {
            checkAll.checked = false;
        }
        return arr;
    }

    //选择所有复选框后控制全选
    for (let i = 0; i < goodList.length; i++) {
        goodList[i].onclick = function () {
            total();
        }
    }

    //全删
    deleteMulty.onclick = function () {
        var arr = isCheck().reverse();
        var res = confirm('您确定删除我了吗？');
        if (res) {
            arr.forEach(function (item) {
                contentCon.removeChild(dataList[item]);
            })
        }
        total(); //调用函数使删除后数据也跟着变化
        addIndex(); //删除后也要绑定索引重置
    }

    //计算总数量和总价格
    function total(arr) {
        var arr = isCheck(); //拿到对应下标
        var sum = 0;
        var priceSum = 0;
        arr.forEach(function (item) {
            sum += goodsCount[item].value * 1;
            priceSum += singleTotal[item].innerHTML * 1;
        })
        //计算总价钱
        seMoney.innerHTML = '￥' + priceSum.toFixed(2);
        //计算总数量
        seCount.innerHTML = sum;
        //控制高亮
        if (arr.length) {
            jiesuan.className = 'active';
        } else {
            jiesuan.className = '';
        }
    }
}