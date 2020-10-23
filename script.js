"use strict"

//alert("Скрипт подключен!");
//составляем алгоритм
//1. по нажатию на любую кнопку 
let progressBar = document.querySelector(".progress-bar");
let bigCup = document.querySelector(".cup");
let state = "idle"; 
/*
Переменная state отвечает за текущее состояник кофемашины.
Возможные значения:
  "idle" - ожидание
  "cooking" - готовка
  "ready" - кофе готов, но пока не забран
  После забора кофе state переходит в состояние "idle" 
*/
function makeCoffee(name, price, element) {
  if (state != "idle") {return;
  }
  //console.log(name, price); //
  let balance = document.querySelector(".form-control");
  //console.log(element);
  //console.log(balance.value); //значение атрибута value при нажатии на кнопку
  if (+balance.value >= price) {
    balance.value -= price;
    balance.style.backgroundColor = "";
    changeDisplayText(`Ваш ${name} готовится`); //вызываем функцию
    state = "cooking";
    
    let coffeeCup = element.querySelector("img"); //находим img
    let cupSrc = coffeeCup.getAttribute("src"); //получаем атрибут src
    //console.log(cupSrc);
    bigCup.setAttribute("src", cupSrc); //меняем кружку с кнопки
    bigCup.style.display = "inline";
    
    let readyPersent = 0; //переменная отвечает за готовность кофе
    let cookingtInterval =  setInterval(function() { 
     readyPersent++;
     //console.log(readyPersent);
     requestAnimationFrame(function() { //предпочтительно использовать для плавности анимации и упорядоченности отрисовки
       bigCup.style.opacity = readyPersent + "%"; //проявляется кружка
       progressBar.style.width = readyPersent + "%"; //не забывать указывать единицы измерения для стиля
     })
     changeDisplayText(`Ваш ${name} готовится. ${readyPersent}%`); //показываем проценты готовности
     if (readyPersent >= 100) {
      clearInterval(cookingtInterval); 
      changeDisplayText(`Ваш ${name} готов!`);
      state = "ready";
      bigCup.style.cursor = "pointer";
      bigCup.onclick = function() { //забираем кофе
        takeCoffee();
      }
 }
}, 30);
  } else {
    balance.style.backgroundColor = "red";
    changeDisplayText("Недостаточно средств");
  } 
}

function takeCoffee() {
  bigCup.style.opacity = "";
  bigCup.style.display = "";
  bigCup.style.cursor = "";
  progressBar.style.width = "";
  
  changeDisplayText("Выберите кофе"); 
  bigCup.onclick = null;
  state = "idle";
  
}

//управляющая функция
function changeDisplayText(message) { //меняет текст на дисплее
  let displayText = document.querySelector(".display-text");
  displayText.innerHTML = message; 
}

//--------------------Drag'n'Drop------------------------------

let money = document.querySelectorAll(".money img") //мы находим в картинки в div money
// for (let i = 0; i < money.length; i++) { //обычный цикл, если нужно менять элементы массива
//   let bill = money[i];
// }

for(let bill of money) { //проще писать код, но создается локальная переменная, таким образом менять элементы массива нельзя
  //console.log(bill);
  bill.onmousedown = function(event) { //к каждой купюре привязали событие и получили координаты курсора с помощью event
    //console.log(event);
    takeMoney(event, bill); //купюру определяем
  }
}

function takeMoney(event, bill) { //описываем функцию, event кочует с функцией
  event.preventDefault() //метод приостанавливает стандартное действие браузера на наше событие (призраки убирают)
  
  let mouseX = event.clientX; //получаем координаты мышки
  let mouseY = event.clientY;
  bill.style.transform = "rotate(90deg)"; //поворачиваем купюру, до сбора координат
 
  let billCoords = bill.getBoundingClientRect(); //данный метод возвращает координаты элементов. У купюры это координаты верхнего левого угла
  //console.log(billCoords);
  
  bill.style.position = "absolute"; //левый верхний край купюры совмещаем с курсором  
  bill.style.top = mouseY - billCoords.width/2 + "px"; //курсор ставится на центр купюры
  bill.style.left = mouseX - billCoords.height/2 +  "px";
  
  //найдем координаты мышки по всему экрану
  window.onmousemove = function(event) {
  let mouseX = event.clientX; //получаем координаты мышки
  let mouseY = event.clientY;
  bill.style.top = mouseY - billCoords.width/2 + "px";
  bill.style.left = mouseX - billCoords.height/2 +  "px";
  
  }
  bill.onmouseup = function(event) { //отпускаем купюру
     window.onmousemove = null;
     //console.log( inAtm(bill) ); //вызываем функцию
     if (inAtm(bill) ) { //если купюра попала в купюроприемник
        //console.log(bill.dataset.cost);
        let balance = document.querySelector(".form-control");
        balance.value = +balance.value + +bill.dataset.cost; //баланс меняется от купюр
        bill.remove(); //элемент удаляется из кода навсегда!!!!
     }
  }
  
}

//сделаем функцию, которая будет определять попала ли купюра в купюроприемник
function inAtm(bill) {
  let atm = document.querySelector(".atm"); //получаем atm
  let atmCoords = atm.getBoundingClientRect(); //получаем координаты atm
  let billCoords = bill.getBoundingClientRect(); //получаем координаты купюры
  
  // координаты находим atm
  let atmLeftTopX = atmCoords.x;
  let atmLeftTopY = atmCoords.y;
  
  let atmLeftBottomX = atmCoords.x;
  let atmLeftBottomY = atmCoords.y + atmCoords.height/3;
  
  let atmRightTopX = atmCoords.x + atmCoords.width;
  let atmRightTopY = atmCoords.y;
   
  // координаты находим купюры
  let billLeftTopX = billCoords.x;
  let billLeftTopY = billCoords.y;
   
  let billRightTopX = billCoords.x + billCoords.width;
  let billRightTopY = billCoords.y;
   
  // console.log([atmLeftTopX, atmLeftTopY, atmLeftBottomX, atmLeftBottomY, atmRightTopX, atmRightTopY, billLeftTopX, billLeftTopY, billRightTopX, billRightTopY]);
  if (billLeftTopX > atmLeftTopX
      && billLeftTopY > atmLeftTopY
      && billLeftTopY < atmLeftBottomY
      && billRightTopX < atmRightTopX)
     {
    return true;
  } else {
    return false;
  }
   
}

//--------------------Создание элементов------------------------
let changeButton =document.querySelector(".change-button");
changeButton.onclick = function() {
  takeChange();
}

function takeChange() {
  let balance = document.querySelector(".form-control");
  if (balance.value >= 10) {
    balance.value -= 10;
    createCoin("10");
    console.log("10");
    return setTimeout(function() {
      takeChange(); //рекурсия
    }, 300);  
  } else if (balance.value >= 5) {
    balance.value -= 5 ;
    createCoin("5");
    console.log("5");
    return setTimeout(function() {
      takeChange(); //рекурсия
    }, 300);  
  } else if (balance.value >= 2) {
    balance.value -= 2 ;
    createCoin("1");
    console.log("2");
    return setTimeout(function() {
      takeChange(); //рекурсия
    }, 300);  
  } else if (balance.value >= 1) {
    balance.value -= 1 ;
    createCoin("1");
    console.log("1");
    return setTimeout(function() {
      takeChange(); //рекурсия
    }, 300);  
  }
}

//создаем функции создания монет
function createCoin(nominal) { //nominal - номинал монет
  // создание монеты
  let coinSrc = "";
  switch (nominal) {
    case "10":
      coinSrc = "img/10rub.png";
      break;
    case "5":
      coinSrc = "img/5rub.png";
      break;
    case "2":
      coinSrc = "img/2rub.png";
      break;
    case "1":
      coinSrc = "img/1rub.png";
      break;
    default:
      return console.error("Неправильный номинал монеты")
  }
  let coin = document.createElement("img"); //в качестве параметра принимает только ТЕГИ. Нужен элемент где он будет создан
  coin.setAttribute("src", coinSrc);
  coin.style.width ="45px";
  coin.style.height ="45px";
  coin.style.position = "absolute";
  let changeContainer = document.querySelector(".change-container"); //находим элемент куда будем прикреплять новый элемент 
  let containerCoors = changeContainer.getBoundingClientRect();
  coin.style.top = Math.floor(Math.random() * (containerCoors.height - 50)) + "px";
  coin.style.left = Math.floor(Math.random() * (containerCoors.width - 50)) + "px";
  coin.style.transition = "transform 300ms esle-in";
  coin.style.transform = "translateY(-40%)";
  setTimeout(function() {
    coin.style.transform = "translateY(0)";
  }, 30);
  changeContainer.append(coin); //добавляет элемент внутрь в конец
  /*добавление элемента в другое место:
    внутрь и в начало - prepend
    рядом перед - before
    рядом после - after
    вместо - replaceWith
  */
  

  
}

























