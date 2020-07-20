function makeCodeCarousel(opt) {

    let defualt = {
        ele: 'tex',//
        codeId: 'code',
        btnId: 'btn',
        tiId: 'ti'
    }
    Object.assign(defualt, opt);

    let tex = document.getElementById(defualt.ele);
    let code = document.getElementById(defualt.codeId);
    let btn = document.getElementById(defualt.btnId);
    let ti = document.getElementById(defualt.tiId);
    let str = '1234567890qwertyuiopasdfghjklzxcvbnmASDFGHJKLZXCVBNMQWERTYUIOP';
    //随机生成验证码
    function random() {
        let html = '';
        for (let i = 0; i < 4; i++) {
            html += str[parseInt(Math.random() * str.length)];
        }
        return html;
    }
    let val2 = random();
    //初始验证码
    code.value = val2;
    code.style.background = 'pink';
    let arr = [0, 1, 2, 3]

    //点击生成验证码
    let num = 0;
    code.onclick = function () {

        if (num >= 4) {
            num = 0;
        }
        // console.log(num, arr[num]);//1 2 3 0
        //切换背景颜色
        if (num == arr[0]) {
            code.style.background = 'blue';
        } else if (num == arr[1]) {//num=2
            code.style.background = 'orange';
        } else if (num == arr[2]) {//num=3

            code.style.background = '#ccc';
        } else if (num == arr[3]) {//num=0

            code.style.background = 'green';
        }
        num++;
        code.value = random();
    }

    //点击验证验证码是否正确
    btn.onclick = function () {
        let val = tex.value;
        if (code.value == val) {
            ti.innerHTML = '验证通过';
            ti.style.color = '#58bc58';
        } else {
            ti.innerHTML = '验证失败';
            ti.style.color = 'red';
        }
    }

}
