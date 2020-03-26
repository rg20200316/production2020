let btnWrapper = document.querySelector('.zol-btmbar .btn-wleft');
let btnWraArr = [
    {
        "name": "购物指南",
        "goodlist": {
            "fname": "购物流程",
            "sname": "常见问题"
        }
    },
    {
        "name": "售后服务",
        "goodlist": {
            "fname": "申请退款",
            "sname": "售后政策",
            "tname": "售后问题"
        }
    },
    {
        "name": "团购特点",
        "goodlist": {
            "fname": "团购优势",
            "sname": "参团效果"
        }
    },
    {
        "name": "商务合作",
        "goodlist": {
            "fname": "媒体合作",
            "sname": "团购合作"
        }
    },
    {
        "name": "商城服务",
        "goodlist": {
            "fname": "010-83417888-9185",
            "sname": "工作日（9：00-18：00）",
            "tname": "关注新浪微博"
        }
    }
];
let html = '';

btnWraArr.forEach(function (item) {
    let ht = '';
    arrGood = item.goodlist;
    for (let ite in arrGood) {
        // console.log(ite);
        ht += `<dd>${arrGood[ite]}</dd>`;
    }
    html += `<dl>` + `<dt>${item.name}</dt>` + `${ht}` + `</dl>`;
});

btnWrapper.innerHTML = html;
