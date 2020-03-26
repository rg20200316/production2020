
(function () {

    let orderTbody = document.querySelector('#order-header tbody');

    ajax({
        type: 'get',
        url: '../../api/zolList.php',
        data: {
            num: 3
        },
        success: function (str) {
            //成功的回调
            shoppCar(str);
            // console.log(str);
        }
    });

    function shoppCar(str) {
        let danCarArr = JSON.parse(str);
        let html = danCarArr.map(function (item) {
            return `<tr data-id="${item.dataId}" class="goods-order-car" istuan="0">
            <td colspan="2" class="s-infor">
                <input name="cartId[]" type="checkbox" value="2977972" rel="foritem"
                    merchantid="199336">
                    <a href="${item.picHref}" class="pic" target="_blank">
                        <img width="80" height="80" src="${item.picSrc}" alt="${item.picAlt}">
                                        </a>
                        <div class="inforbox">
                            <h3 class="tit">
                                <a href="${item.picHref}" title="${item.picAlt}" target="_blank">${item.picAlt}</a>
                            </h3>
                            <div class="security clearfix">
                                <a href="${item.securityHerf}" title="7天退换货" class="security-a" target="_blank"></a>
                            </div>
    
                            <p>颜色：${item.pTxt}</p>
                            <div class="info-con">
                                <span>套装：官方标配</span>
                                <div class="info-help">
                                    <h5>官方标配：</h5>
                                    <p>${item.picAlt}</p>
                                </div>
                            </div>
    
                        </div>
                                    </td>
                    <td class="s-price">
                        <em>${item.Sprice}</em>
                    </td>
                    <td class="s-amount ">
                        <div class="buy-num">
                            <a class="minus car-cute" href="###" title="减一">-</a>
                            <input type="text" class="text-amount" value="1"
                                data-kucun="${item.maxNumber}">
                                <a class="plus car-add" href="###" title="加一">+</a>
                                <div class="tips-2" style="display:none;"></div>
                                        </div>
                                    </td>
                        <td class="s-agio">
                            <div>−−</div>
                        </td>
                        <td class="s-total">
                            <em>${item.Stotal}</em>
                        </td>
                        <td class="s-del">
                            <div class="s-delbox">
                                <a class="shop-move" href="###" title="移入收藏夹">移入收藏夹</a>
                                <a class="shop-delete" href="###">删除</a>
                                <div class="deletebox" style="display: none;">
                                    <p>确认要删除该商品吗？</p>
                                    <a class="aYes" href="###">是的</a>
                                    <a class="aNo" href="###">取消</a>
                                    <i></i>
                                </div>
                            </div>
                        </td>
                                </tr>`;
        }).join('');

        let tabeHtml = '';
        tabeHtml = `<tr class="order-th-head">
                        <th class="th-1">
                            <input class="checkAllCart" type="checkbox" value="1">全选
                            </th>
                            <th class="th-2">所选商品</th>
                            <th class="th-3">单价（元）</th>
                            <th class="th-4">数量</th>
                            <th class="th-5">优惠</th>
                            <th class="th-6">小计（元）</th>
                            <th class="th-7">操作</th>
                        </tr>`  +
            `<tr id="spuid">
                            <td colspan="7" class="store-infor clearfix">
                                <div class="shopname">
                                    <input name="merchantId[]" type="radio" rel="forshop"
                                        value="199336" checked="">店铺：
                                <a href="http://www.zol.com/shop_199336/" target="_blank">锦鑫科技电脑专营店</a>
                            </div>
                                    <div class="contact">
                                        <a class="tag-security" style="margin: 0 -9px 0 0">&nbsp;</a>
                                    </div>
                                    <div class="contact">
                                        <a target="_blank"
                                            href="http://wpa.qq.com/msgrd?v=3&amp;uin=308678776?>&amp;site=qq&amp;menu=yes">
                                            <img border="0" src="http://wpa.qq.com/pa?p=2:308678776:52" alt="点击这里给我发消息"
                                                title="点击这里给我发消息">
                                </a>
                            </div>
                        </td>
                    </tr>` + html;
        //渲染
        orderTbody.innerHTML = tabeHtml;
        //节点
        let checkAll = document.querySelector('.order-th-head .th-1 input');
        let danChecks = document.querySelectorAll('.s-infor input');
        let sPrices = document.querySelectorAll('.goods-order-car .s-price em');//单价
        let sTotals = document.querySelectorAll('.goods-order-car .s-total em');//小计
        let carCutes = document.querySelectorAll('.buy-num .car-cute');//减
        let carAdds = document.querySelectorAll('.buy-num .car-add');//加
        let kucuns = document.querySelectorAll('.buy-num .text-amount');//库存
        let shopMoves = document.querySelectorAll('.s-del .shop-move');//移入收藏
        let shopDeletes = document.querySelectorAll('.s-del .shop-delete');//删除当行
        let deleteBoxs = document.querySelectorAll('.s-del .deletebox');//弹窗
        // let deleteBoxsNo = document.querySelectorAll('.s-del .deletebox a')[1];//提示信息
        let totalCartTopPrice = document.querySelector('.total .total-cart-price');//顶部总价
        let totalCartFootPrice = document.querySelector('.total-price .total-cart-price');//底部总价
        let allDelete = document.querySelector('.order-foot .allDelete');//全部删除
        let spuid = document.querySelector('#spuid .store-infor');//店铺名
        let gouSum = document.querySelector('.cart-state .gou-sum');//总数量
        let accountingBtn = document.querySelector('.accounting-btn');//结算
        // console.log(accountingBtn);


        //全选
        checkAll.onclick = function () {
            for (let i = 0; i < danChecks.length; i++) {
                danChecks[i].checked = checkAll.checked;
            }
            seMoneyTatol();
        }

        //反选
        for (let i = 0; i < danChecks.length; i++) {
            danChecks[i].onclick = function () {
                isCheck();
                seMoneyTatol();
            }
        }

        //封装反控全选
        function isCheck() {
            let danChecks = document.querySelectorAll('.s-infor input');//单选
            let num = 0;//计数器
            let arr = [];//单选框被选中的个数
            for (let i = 0; i < danChecks.length; i++) {
                if (danChecks[i].checked) {
                    num++;
                    arr.push(i);
                }
            }
            //判断单选框是否已经被全部选中
            if (num == danChecks.length && num != 0) {
                checkAll.checked = true;
            } else {
                checkAll.checked = false;
            }
            return arr;
        }

        let sum = danChecks.length;
        // 加、减、删除
        for (let i = 0; i < danChecks.length; i++) {

            let sumCute = kucuns[i].value * 1;//当前值

            //手动输入
            kucuns[i].onblur = function () {
                sumCute = kucuns[i].value * 1;//输入后的值
                bner(i, sumCute);
            }

            //减
            carCutes[i].onclick = function () {
                sumCute--;
                bner(i, sumCute);
                seMoneyTatol();

            }

            //加
            carAdds[i].onclick = function () {
                sumCute++;
                bner(i, sumCute);
                seMoneyTatol();

            }

            //删除当行
            shopDeletes[i].onclick = () => {
                let nowS = i + 1;
                //console.log(nowS);
                sum--;
                ajax({
                    type: 'get',
                    url: '../../api/shopDelete.php',
                    data: {
                        uid: nowS
                    },
                    success: function (str) {
                        //成功的回调
                        ad(str);
                    }
                });
                function ad(str) {
                    if (str == 'yes') {
                        console.log('删除成功');
                    } else {
                        console.log('删除失败');
                    }
                }
                let contentCon = shopDeletes[i].parentNode.parentNode.parentNode.parentNode;
                let content = shopDeletes[i].parentNode.parentNode.parentNode;
                deleteBoxs[i].style.display = 'block';
                let deleteBoxsYes = document.querySelectorAll('.s-del .deletebox .aYes');//提示信息
                let deleteBoxsNo = document.querySelectorAll('.s-del .deletebox .aNo');//提示信息

                deleteBoxsYes[i].onclick = function () {
                    contentCon.removeChild(content);
                }
                deleteBoxsNo[i].onclick = function () {
                    deleteBoxs[i].style.display = 'none';
                }
                regSum(sum);
                seMoneyTatol();
            }

            //移入收藏
            shopMoves[i].onclick = () => {
                console.log(0);
            }
        }

        function regSum(sum) {
            if (sum != 0) {
                spuid.style.display = '';
            } else {
                spuid.style.display = 'none';
            }
        }
        //全部删除
        allDelete.onclick = function () {
            for (let i = 0; i < danChecks.length; i++) {
                let contentCon = shopDeletes[i].parentNode.parentNode.parentNode.parentNode;
                let content = shopDeletes[i].parentNode.parentNode.parentNode;
                contentCon.removeChild(content);
                sum--;
            }
            for (let j = 0; j < danChecks.length; j++) {

            }
            // console.log(typeof yes);
            ajax({
                type: 'get',
                url: '../../api/shopAllDelete.php',
                data: {
                    uid: 2
                },
                success: function (str) {
                    //成功的回调
                    ad(str);
                }
            });
            function ad(str) {
                if (str == 'yes') {
                    console.log('删除成功');
                    // spuid.style.display = 'none'
                } else {
                    console.log('删除失败');
                }
            }
            regSum(sum);
            seMoneyTatol();
        }

        //封装加减
        function bner(now, sumCute) {//now 索引
            let sumKucun = kucuns[now].dataset.kucun * 1;
            if (sumCute >= sumKucun) {
                sumCute = sumKucun;
            } else if (sumCute < 1) {
                sumCute = 1;
            }
            let chNum = sumKucun - sumCute;
            let nowS = now + 1;
            //console.log(nowS, sumKucun, chNum);
            ajax({
                type: 'get',
                url: '../../api/shopId.php',
                data: {
                    uid: nowS,
                    changNum: chNum
                },
                success: function (str) {
                    //成功的回调
                    agd(str);
                }
            });
            function agd(str) {
                if (str == 'yes') {
                    console.log('修改成功');
                } else {
                    console.log('修改失败');
                }
            }
            kucuns[now].value = sumCute;
            sTotals[now].innerHTML = sumCute * sPrices[now].innerHTML;
            seMoneyTatol();
        }
        //总数与总价
        function seMoneyTatol() {
            let arr = isCheck();
            let sumNber = 0;//数量
            let priceSum = 0;//单价
            // console.log(arr.length);
            arr.forEach(function (item) {
                sumCute = kucuns[item].value * 1;//当前值
                sumNber += sumCute;
                priceSum += (kucuns[item].value * 1) * (sPrices[item].innerHTML * 1);
            });
            // console.log(priceSum);
            gouSum.innerHTML = sumNber;
            totalCartTopPrice.innerHTML = totalCartFootPrice.innerHTML = priceSum;

        }
        //结算
        accountingBtn.onclick = function () {
            console.log(2);

        }

    }


})();

