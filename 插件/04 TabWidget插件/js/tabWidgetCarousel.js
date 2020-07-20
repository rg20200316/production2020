
function tabWidgetCarousel(opt) {

    var defaultOpt = {
        //默认参数
        ele: 'tabWidget-top',
        minId: 'tabWidget-bottom',
        liName: 'li',
        // ulName: 'ul',
        // arr1: ['新闻', '娱乐', '科技', '生活'],
        // arr2: ['这是新闻模块', '请欣赏娱乐模块', '接触科技', '体验生活']
    }
    //Object.assign(target，sources);  =>语法
    // target: 目标对象 
    // sources: 源对象  返回值 是 目标对象；
    Object.assign(defaultOpt, opt);

    //方法一：先遍历渲染，再找节点
    let tabWidgetTop = document.getElementById(defaultOpt.ele);
    let tabWidgetBottom = document.getElementById(defaultOpt.minId);
    let list = tabWidgetTop.getElementsByTagName(defaultOpt.ulName)[0];//导航块
    let list2 = tabWidgetBottom.getElementsByTagName(defaultOpt.ulName)[0];//内容=块
    let navArr = defaultOpt.arr1;
    let contArr = defaultOpt.arr2;
    let html1 = '';
    let html2 = '';
    //遍历
    for (let i = 0; i < navArr.length; i++) {
        html1 += `<li>${navArr[i]}</li>`;
        html2 += `<li>${contArr[i]}</li>`;
    }
    //渲染
    list.innerHTML = html1;
    list2.innerHTML = html2;
    //获取节点
    let alis = tabWidgetTop.getElementsByTagName('li');
    let alis2 = tabWidgetBottom.getElementsByTagName('li');
    //控制选项卡的内容显示及导航栏对应信息的高亮状态
    for (let i = 0; i < alis.length; i++) {
        //默认第一块高亮并显示
        alis[0].className = 'active';
        alis2[0].style.display = 'block';

        alis[i].onclick = function () {
            for (let i = 0; i < alis.length; i++) {
                alis[i].className = '';
                // alis2[i].style.display = 'none';
                css(alis2[i], 'display', 'none');
            }
            alis[i].className = 'active';
            css(alis2[i], 'display', 'block');
        }
    }
    /* 
     //方法二，直接查找节点，然后修改内容
     (function(){
     //节点
     let tabWidgetTop = document.getElementById(defaultOpt.ele);
     let tabWidgetBottom = document.getElementById(defaultOpt.minId);
     let list = tabWidgetTop.getElementsByTagName(defaultOpt.liName);
     let list2 = tabWidgetBottom.getElementsByTagName(defaultOpt.liName);
 
     for (let i = 0; i < list.length; i++) {
         // list[i].index = i;
         //默认高亮
         list[0].className = 'active';
         // list2[0].style.display = 'block';
         css(list2[0], 'display', 'block');
         //点击切换
         list[i].onclick = function () {
             //排他
             for (let i = 0; i < list.length; i++) {
                 list[i].className = '';
                 // list2[i].style.display = 'none';
                 css(list2[i], 'display', 'none');
             }
             list[i].className = 'active';
             // list2[i].style.display = 'block';
             css(list2[i], 'display', 'block');
         }
     }
     })();
    */
}