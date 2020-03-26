function regCookie() {

    let topbarLeftLogin = document.querySelector('.topbar-left-login');
    let topbarLeftRegister = document.querySelectorAll('.topbar-left-register a')[0];
    let topbarLeftRegister2 = document.querySelectorAll('.topbar-left-register a')[1];

    //获取cookie
    function getcookie(key) {
        let str = document.cookie;
        let arr = str.split('; ');
        for (let item of arr) {
            let arr2 = item.split('=');
            if (key == arr2[0]) {
                return arr2[1];
            }
        }
    }
    //判断选择是否是登陆状态
    let userNameVal = getcookie('username');
    if (userNameVal) {
        //登陆中
        topbarLeftRegister.style.display = 'none';
        topbarLeftRegister2.style.display = 'block';
        topbarLeftLogin.innerHTML = userNameVal + '欢迎你';
    } else {
        topbarLeftRegister2.style.display = 'none';
        topbarLeftRegister.style.display = 'block';
    }
}
regCookie();
