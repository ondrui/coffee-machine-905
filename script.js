"use strict"

//alert("Скрипт подключен!");
//составляем алгоритм
//1. по нажатию на любую кнопку 
function makeCoffee(name, price) {
  //console.log(name, price); //
  let balance = document.querySelector(".form-control");
  //console.log(balance.value); //значение атрибута value при нажатии на кнопку
  if (+balance.value >= price) {
    balance.value -= price;
    balance.style.backgroundColor = "";
    chanceDisplayText(`Ваш ${name} готовится`); //вызываем функцию
  } else {
    balance.style.backgroundColor = "red";
    chanceDisplayText("Недостаточно средств");
  } 
}

//управляющая функция
function chanceDisplayText(message) { //меняет текст на дисплее
  let displayText = document.querySelector(".display-text");
  displayText.innerHTML = message; 
}


























