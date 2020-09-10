"use strict"

//alert("Скрипт подключен!");
//window.location.href = "https://yandex.ru" - переход на страницу
//window.document.documentElement - еще один объект DOM
//document.body - обращение к body, 


//DOM-дерево  («Document Object Model», коротко DOM),

// 1. Найти элемент 2. Изменить что-нибудь (см. конспект)

//Найти элемент
//Методы поиска по DOM-элементам

//Устаревшие методы поиска. Сейчас не используют!!!!!
// let images = document.getElementsByTagName("img");
// console.log(images[0]);
// console.log(images);
// let coffeeList = document.getElementsByClassName("coffee-item");
// console.log(coffeeList);
// let coffee = document.getElementById("coffee-machine");
// console.log(coffee);





//Современные методы поиска работают любые селекторы из css
// let atm = document.querySelector(".atm-container"); //данная команда возвращает элемент, если элементов много, то найдет первый в коде
// console.log(atm);

// let coffeeItem = document.querySelector(".coffee-item");
// console.log(coffeeItem);

// let coffeeNames = document.querySelectorAll("span");
// console.log(coffeeNames);

//задание сдача и кружки
//данные методы спускаются по дереву ВНИЗ
// let button = document.querySelector(".btn");
// console.log(button);

// let coffeeCup = document.querySelectorAll(".coffee-item img");
// console.log(coffeeCup);

// let rowCol = document.querySelectorAll(".col-6 span");
// console.log(rowCol);

// let rowCol1 = document.querySelector(".col-6 span");
// console.log(rowCol1);

//Навигация по DOM-элементам

// let buttons = document.querySelectorAll(".coffee-item");
// let cappuccinoButton = buttons[1];
// console.log(cappuccinoButton);

//родители
// let coffeeList = cappuccinoButton.parentElement;
// console.log(coffeeList); //div.col-6.coffee-list.d-flex.flex-column.justify-content-around
// // //соседи
// let nextCoffee = cappuccinoButton.nextElementSibling;
// console.log(nextCoffee);
// let previousCoffee = cappuccinoButton.previousElementSibling;
// console.log(previousCoffee);
// //дети
// let cappuccinoChildren = cappuccinoButton.children;
// console.log(cappuccinoChildren); //нашли всех детей
// //найти одного ребенка
// let cappuccinoText = cappuccinoButton.querySelector("span");
// console.log(cappuccinoText);


// заменим цвет фона на красный,
//document.body.style.background = "grey";

// а через секунду вернём как было
//setTimeout(() => document.body.style.background = "", 1000);

//Изменение элементов 
//Изменение CSS стилей

//let bigCup = document.querySelectorAll(".coffee-item img");//нашли кружку
//for (let i = 0; i < 3; i++) {
//let bigBigCup = bigCup[i];
//console.log(bigBigCup.style.width); //пустое изначально
//bigBigCup.style.width = "500px"; //обращаемся к стилю и меняем размер

//console.log(bigBigCup.style.width); //пустое изначально
//bigBigCup.style.height = "500px"; //обращаемся к стилю и меняем размер


//bigBigCup.style.display = "none";
//bigBigCup.style.display = "";
//bigBigCup.style.backgroundColor = "red";
//}
//bigCup.style.display = ""; //сбрасываем свойство. Вернуть как было

//bigCup.style.backgroundColor = "red"; //если свойство через тире, то применяют верблюжью нотацию

//запуск анимации
// let bigCup = document.querySelector(".cup");//нашли кружку
// bigCup.style.transition = "transform 1s";

// setTimeout(function() { 
//   bigCup.style.transform = "rotate(36000deg)";
// }, 5000); //два параметра функция и время

//let bigCup = document.querySelector(".cup");//нашли кружку
//bigCup.style.transition = "transform 1s";

// let bigCup = document.querySelectorAll(".coffee-item img");//нашли кружку
// let bigBigCup = bigCup[2];
// bigBigCup.style.transition = "transform 1s";
// setTimeout(function() { 
//   bigBigCup.style.transform = "rotate(3600deg)";
// }, 1000); //два параметра функция и время
//}

//Изменение атрибутов

// let bigCup = document.querySelector(".cup");//нашли кружку
// console.log( bigCup.hasAttribute("src") ); //true проверяет наличие атрибута
// let cupSrc = bigCup.getAttribute("src"); //получает значение атрибута
// console.log(cupSrc); //img/americano.png

// bigCup.setAttribute("src", "img/cappuccino.png"); //картинка заменится на капучино  -- устанавливает значение атрибута
// bigCup.removeAttribute("src"); //картинка пропадет --  удаляет атрибут
// //console.log( bigCup.getAttribute("src") ); //nuii
// console.log(bigCup);


//задание: заменить картинку .cup  на эспрессо

// let buttons = document.querySelectorAll(".coffee-item"); //находим массив с кнопками .coffee-item
// let espresso = buttons[2]; //находим нужный элемент из массива -- эспрессо
// console.log(espresso);
// let espressoImage = espresso.querySelector("img"); //выбираем селектор по тегу img 
// console.log(espressoImage);
// let espressoSrc = espressoImage.getAttribute("src"); //получаем значение атрибута src
// console.log(espressoSrc);
// let bigCup = document.querySelector(".cup"); //находит элемент к которому будем применять новый атрибут
// console.log(bigCup);
// bigCup.setAttribute("src", espressoSrc); //устанавливаем новый атрибут элементу

//Изменение внутреннего содержимого элемента

// let displayText = document.querySelector(".display-text");
// //поменять текст
// console.log(displayText.innerText);
// displayText.innerText = "Ваш <b>капучино</b> готовится";

// //displayText.innerHTML = "Ваш Латтэ готовится";

// displayText.innerHTML = "Ваш <b>Латтэ</b> готовится";

//добавить кнопки к аппарату

// let coffeeList = document.querySelector(".coffee-list");

// for (let i = 0; i < 2; i++) {
//   coffeeList.innerHTML += `
//   <div class="coffee-item">
//     <img src="img/espresso.png" alt="Эспрессо">
//     <span>Эспрессо - 61 руб.</sn pan>
//   </div>
//   `;
// }

//Изменение классов

//let changeBtn = document.querySelector(".btn");

//console.log(changeBtn.className);
//changeBtn.className = "btn btn-success btn-block"; //

//console.log(changeBtn.classList);

// changeBtn.classList.add("p-3"); //Добавить класс
// changeBtn.classList.remove("my-2"); //Удалить класс
// console.log( changeBtn.classList.contains("btn") ); //true Проверить наличие
// changeBtn.classList.toggle("my-5"); //добавляет или удаляет класс























































