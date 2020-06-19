import { COLS_COUNT, ROWS_COUNT, generateRows } from './generateField';

generateRows(ROWS_COUNT, COLS_COUNT);

let user_1;
let user_2;
let cell = document.getElementsByClassName('cell');
const redo = document.getElementsByClassName('redo-btn')[0];
const undo = document.getElementsByClassName('undo-btn')[0];
const won = document.getElementsByClassName('won-title')[0];
const restart = document.getElementsByClassName('restart-btn')[0];
const fields = document.getElementsByClassName('field')[0];

function check(obj) {
  const new_obj = Array.from(obj.actions).sort(function (a, b) {
    return a - b;
  });
  for (let i = 0; i <= new_obj.length - ROWS_COUNT; i++) {
    const str = Number(new_obj[i]) / ROWS_COUNT;
    const m = ROWS_COUNT;
    let n = str + 1;
    const control_sum_horizontal = m * m * (n - 1) + m * ((m - 1) / 2);
    const wonn_arr = [];
    if (str % 1 == 0) {
      let sum = 0;
      for (let a = i; a < i + ROWS_COUNT; a++) {
        sum += +new_obj[a];
        wonn_arr.push(new_obj[a]);
      }
      if (sum == control_sum_horizontal) {
        win(wonn_arr, 'horizontal', obj);
        return 'end';
      }
    }
    if (Number(new_obj[i]) < ROWS_COUNT) {
      n = Number(new_obj[i]) + 1;
      const control_sum_vertical = m * (m * ((m - 1) / 2)) + (n - 1) * m;
      let sum = 0;
      const won_arr = [];
      for (let a = i, j = Number(new_obj[i]); a < i + ROWS_COUNT; a++, j += ROWS_COUNT) {
        const res = obj.actions.find(function (e) {
          return e == j;
        });
        if (res != undefined) {
          sum += +res;
          won_arr.push(res);
        }
      }
      if (sum == control_sum_vertical) {
        win(won_arr, 'vertical', obj);
        return 'end';
      }
    }
    if (Number(new_obj[i]) == 0 || Number(new_obj[i]) == ROWS_COUNT - 1) {
      n = Number(new_obj[i]) + 1;
      const control_sum_vertical = m * (m * ((m - 1) / 2)) + (1 - 1) * m;
      const control_sum_horizontal = m * m * (1 - 1) + m * ((m - 1) / 2);
      let sum = 0;
      const won_arr = [];
      for (let a = i, j = Number(new_obj[i]); a < i + ROWS_COUNT; a++, j += ROWS_COUNT + 1) {
        const res = obj.actions.find(function (e) {
          return e == j;
        });
        if (res != undefined) {
          sum += +res;
          won_arr.push(res);
        }
      }
      if (sum == control_sum_vertical + control_sum_horizontal) {
        win(won_arr, 'diagonal-right', obj);
        return 'end';
      }
    }
    if (Number(new_obj[i]) == ROWS_COUNT - 1) {
      n = Number(new_obj[i]) + 1;
      const control_sum_vertical = m * (m * ((m - 1) / 2)) + (1 - 1) * m;
      const control_sum_horizontal = m * m * (1 - 1) + m * ((m - 1) / 2);
      let sum = 0;
      const won_arr = [];
      for (let a = i, j = Number(new_obj[i]); a < i + ROWS_COUNT; a++, j += ROWS_COUNT - 1) {
        const res = obj.actions.find(function (e) {
          return e == j;
        });
        if (res != undefined) {
          sum += +res;
          won_arr.push(res);
        }
      }
      if (sum == control_sum_vertical + control_sum_horizontal) {
        win(won_arr, 'diagonal-left', obj);
        return 'end';
      }
    }
  }
  if (user_1.actions.length + user_2.actions.length == ROWS_COUNT * ROWS_COUNT) {
    win(false);
    return 'end';
  }
  return null;
}
function getStorage() {
  const data = JSON.parse(localStorage.data);
  user_1 = data[0];
  user_2 = data[1];
}
function setStorage() {
  localStorage.data = JSON.stringify([user_1, user_2]);
}
function draw() {
  const ch = document.getElementsByClassName('ch');
  const r = document.getElementsByClassName('r');
  if (arguments[0] == true) {
    for (let a = 0; a < ch.length; a++) {
      ch[a].setAttribute('class', 'cell');
      a--;
    }
    for (let j = 0; j < r.length; j++) {
      r[j].setAttribute('class', 'cell');
      j--;
    }
  }
  for (let a = 0; a < ch.length; a++) {
    ch[a].classList.remove('ch');
    a--;
  }
  for (let j = 0; j < r.length; j++) {
    r[j].classList.remove('r');
    j--;
  }
  if (arguments[0] != true) {
    for (let i = 0; i < user_1.actions.length; i++) {
      cell[user_1.actions[i]].classList.add('ch');
    }
    for (let a = 0; a < user_2.actions.length; a++) {
      cell[user_2.actions[a]].classList.add('r');
    }
  }
}
if (localStorage.data != undefined) {
  getStorage();
  control_button();
  draw();
  const res = check(user_1);
  if (res != 'end') {
    check(user_2);
  }
} else {
  user_1 = {
    name: 'Crosses',
    flag: true,
    actions: [],
  };
  user_2 = {
    name: 'Toes',
    flag: false,
    actions: [],
  };
  localStorage.data = JSON.stringify([user_1, user_2]);
}
window.onstorage = function (e) {
  if (localStorage.data == undefined) {
    unset();
    return;
  }
  if (e.key != 'data') return;
  getStorage();
  control_button();
  draw();
  const res = check(user_1);
  if (res != 'end') {
    check(user_2);
  }
};
function whoMove() {
  if (arguments[0] == 'reverse') {
    if (user_1.flag == true) {
      user_1.flag = false;
      user_2.flag = true;
      return user_1;
    }

    user_1.flag = true;
    user_2.flag = false;
    return user_2;
  }
  if (user_1.flag == true) {
    user_1.flag = false;
    user_2.flag = true;
    return user_2;
  }

  user_1.flag = true;
  user_2.flag = false;
  return user_1;
}
function control_button() {
  if (user_1.actions.length > 0) {
    undo.disabled = false;
  }
  if (localStorage.history != undefined) {
    const obj = JSON.parse(localStorage.history);
    if (user_1.actions.length == 0) undo.disabled = true;
    if (user_1.actions.length != obj.user_1.length || user_2.actions.length != obj.user_2.length) {
      redo.disabled = false;
    }
    if (user_1.actions.length == obj.user_1.length && user_2.actions.length == obj.user_2.length) {
      redo.disabled = true;
    }
  }
}
function history() {
  localStorage.history = JSON.stringify({
    user_1: user_1.actions,
    user_2: user_2.actions,
  });
}
function win(arr, type, obj) {
  if (arr !== false) {
    for (let i = 0; i < arr.length; i++) {
      cell[arr[i]].classList.add(type);
      cell[arr[i]].classList.add('win');
    }
    document.getElementsByClassName('won-message')[0].innerHTML = `${obj.name} won`;
  } else {
    document.getElementsByClassName('won-message')[0].innerHTML = "It's a draw!";
  }
  won.classList.remove('hidden');
  fields.onclick = null;
  undo.disabled = true;
}

function addEvent() {
  fields.onclick = function (elem) {
    const el = elem.target;
    if (el.id == '') return null;
    if (el.classList.contains('ch') != true && el.classList.contains('r') != true) {
      undo.disabled = false;
      redo.disabled = true;
      if (user_1.flag == true) {
        user_1.actions.push(el.getAttribute('data-id'));
        el.classList.add('ch');
        check(user_1);
        user_1.flag = false;
        user_2.flag = true;
      } else {
        user_2.actions.push(el.getAttribute('data-id'));
        el.classList.add('r');
        check(user_2);
        user_1.flag = true;
        user_2.flag = false;
      }
      history();
      setStorage();
    }
    return null;
  };

  undo.onclick = function () {
    whoMove().actions.pop();
    setStorage();
    draw();
    redo.disabled = false;
    if (user_1.actions.length == 0) undo.disabled = true;
  };
  redo.onclick = function () {
    const temp = whoMove('reverse');
    const stor = JSON.parse(localStorage.history);
    let usr;
    if (temp.name == 'Crosses') {
      usr = stor.user_1;
    } else {
      usr = stor.user_2;
    }
    temp.actions.push(usr[temp.actions.length]);
    setStorage();
    draw();
    undo.disabled = false;
    const obj = JSON.parse(localStorage.history);
    if (user_1.actions.length == obj.user_1.length && user_2.actions.length == obj.user_2.length) {
      redo.disabled = true;
    }
  };
  restart.onclick = unset;
}
addEvent();
function unset() {
  user_2.actions = [];
  user_1.actions = [];
  localStorage.clear();
  draw(true);
  addEvent();
  user_2.flag = false;
  user_1.flag = true;
  won.classList.add('hidden');
  cell = document.getElementsByClassName('cell');
  localStorage.data = JSON.stringify([user_1, user_2]);
}
restart.onclick = unset;
