function accordionCarousel(opt) {
    let defaultOpt = {
        ele: 'box',
        arrh1: ['1', '2', '3', '4', '5'],
        arrCon: [1, 2, '3', '4', '5']
    };
    Object.assign(defaultOpt, opt);

    let box = document.getElementById(defaultOpt.ele);
    let arrh1 = defaultOpt.arrh1;
    let arrCon = defaultOpt.arrCon;
    // console.log(box, arrCon, arrh1);
    let html = '';
    for (let i = 0; i < arrh1.length; i++) {

        html += `<div class="con">
                        <h1>${arrh1[i]}</h1>
                        <ul>
                            <li>${arrCon[i]}</li>
                            <li>${arrCon[i]}</li>
                            <li>${arrCon[i]}</li>
                        </ul>
                    </div>`;

    }
    box.innerHTML = html;
    let acons = box.getElementsByClassName('con');
    // console.log(acons);

    for (let j = 0; j < acons.length; j++) {
        let isok = false;
        acons[j].onclick = function () {
            if (isok == false) {
                startMove(acons[j].children[1], { 'height': 120 });
                isok = true;
            } else {
                startMove(acons[j].children[1], { 'height': 0 });
                isok = false;
            }

        }
    }

}