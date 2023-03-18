//Функция показывает section "bet-form" а остальные  section скрывает (<section id="bet-result"> и<section id="bet-point">).
//В дальнейшем все что находится в параметрах будет открывать style.display = "block". а остальное скрывать style.display = "none"
function layout(element) {
    document
        .querySelectorAll("main > section")
        .forEach((section) => (section.style.display = "none"));
    document.getElementById(element).style.display = "block";
}
//Функция возвращает рандомных два числа
function getRandomIntInclusive(min, max) {
    //Округление в переменной min в большую сторону console.log(Math.ceil(7.004));  // // Expected output: 8
    min = Math.ceil(min);
    //Округление в переменной max в меньшую сторону console.log(Math.floor(5.95));  // // Expected output: 5
    max = Math.floor(max);
    ///*Math.random() генерирует случайное число в диапазоне от 0 до 1.
    // max - min + 1 определяет разницу между максимальным и минимальным значениями, включая оба значения.
    // Math.random() * (max - min + 1) умножает случайное число на разницу между максимальным и минимальным значениями, что дает случайное число в диапазоне от 0 до max - min.
    // Math.floor(Math.random() * (max - min + 1)) округляет случайное число до ближайшего целого числа в диапазоне от 0 до max - min. в меньшую сторону
    // Math.floor(Math.random() * (max - min + 1)) + min добавляет минимальное значение min к округленному случайному числу, чтобы получить случайное целое число в диапазоне от min до max.*/
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Это переменные в начале показывают баланс денег на счете клиента почему let потому что меняется счет 56 и 58 строка
let balance = 500;
//Это переменные в начале показывают точку клиента почему let потому что меняется счет 48 и 53 строка
let globalPoint = 0;

//Вызывает функцию layout принимает в качестве аргумента section с id "bet-form"
layout("bet-form");
//Перезаписывает в поле "h1 strong" данные а конкретно добавляет переменную balance + знак "$"
document.querySelector("h1 strong").innerHTML = balance + "$";
//ВЫВОДИТ ЕЛЕМЕНТЫ С ЗНАЧЕНИЯМИ
function resultText(balance, cube1, cube2, decision, bet) {
    return `
      <h1>Your Balance: <strong>${balance}$</strong></h1>
      <p>On dices: <strong>${cube1}</strong>, <strong>${cube2}</strong></p>
      <p id="resultText">You ${decision} <strong>${bet}$</strong></p>
    `;
}
//Функция НЕ возвращает окончательный результат, а только вывода в консоль кубики и т.д. зачем ЭТО ТОЛЬКО decision и balance в параметрах????? просто потом продолжаешь играть
function resultBetText(balance, cube1, cube2, decision, bet, point) {
    return `
      <h1>Your bet: <strong>${bet}$</strong></h1>
      <p>On dices: <strong>${cube1}</strong>, <strong>${cube2}</strong></p>
      <p>Your point <strong>${point}</strong></p>
    `;
}
//при нажатии на кнопку в 22 строке срабатывает вызов функции onclick="goBackHandler()
function rollTheDiceHandler() {
    // 18 строка в html  <input type="number" placeholder="Place a bet" id="bet"> берется значение которое ввели или пустое
    const bet = document.querySelector("#bet").value;
    //вызываем рандомную функцию
    const cube1 = getRandomIntInclusive(1, 6);
    const cube2 = getRandomIntInclusive(1, 6);
    //Прибавляет значения после рандомной функции
    const point = cube1 + cube2;
    //Получить решение вызов функции
    let decision = getDecision(cube1, cube2);
    //Первый раз false потому что 0, а потом уже не ноль потому что значение поменялось в 67 строке
    if (globalPoint) {
        //вызов функции решение по точкам
        decision = getDecisionOnPoint(cube1, cube2, globalPoint);
    }
    //Если строка решения равна "point" тогда проверка
    if (decision === "point") {
        //Если равна 0 то есть false тогда глобальная точка равна результату рандомных функций строка 54
        if (!globalPoint) {
            globalPoint = point;
        }
        //Перезаписывает в  <div id="resultBetInfo">  зачем ЭТО ТОЛЬКО decision и balance в параметрах?????
        document.querySelector("#resultBetInfo").innerHTML = resultBetText(balance, cube1, cube2, decision, bet, globalPoint);
         //Чтобы играл дальше
        layout("bet-point");
        //Если не в первый раз тогда
    } else {
        //обнуляем
        globalPoint = 0;
        //выводим секцию результат
        layout("bet-result");
        //Прибавляем
        if (decision === "win") {
            //прибавляем parseInt ПОТОМУ ЧТО передается значение строка, а не число 50 строка html
            balance = balance + parseInt(bet);
            //отнимаем  //parseInt ПОТОМУ ЧТО передается значение строка, а не число 50 строка html
        } else {
            balance = balance - parseInt(bet);
        }
        // Просто вызов функции resultText и вывод результата на экран
        document.querySelector("#resultInfo").innerHTML = resultText(
            balance,
            cube1,
            cube2,
            decision,
            bet
        );
    }
}
//Добавляем "$" и вызываем первоначальный селект <section id="bet-form"> потому что     <section id="bet-result">
function goBackHandler() {
    document.querySelector("h1 strong").innerHTML = balance + "$";
    layout("bet-form");
}
//функция решение принимать два параметра
function getDecision(a, b) {
    //сумма двух параметров
    const sum = a + b;
    //если сумма  sum == 7 || sum == 11 тогда возвращает строку "win" и все отлично если сразу и globalPoint=0 а так будет getDecisionOnPoint
    if (sum == 7 || sum == 11) {
        return "win";
        //если сумма  sum === 2 || sum === 8 || sum === 12 тогда возвращает строку "lose" если сразу и globalPoint=0 а так будет getDecisionOnPoint
    } else if (sum === 2 || sum === 8 || sum === 12) {
        return "lose";
    }
    //в других случаях возврат строки "point"
    return "point";
}
//функция принимает значение кубиков и точки в прошлый раз
function getDecisionOnPoint(a, b, point) {
    //Если равно тогда возвращает строку "lose"
    const sum = a + b;
    if (sum === 7) {
        return "lose";
        //Если значение в прошлый раз рано сумме кубиков тогда возвращает строку "win"
    } else if (sum === point) {
        return "win";
    } else {
        //в других случаях возврат строки "point"
        return "point";
    }
}
/* <div id="resultInfo">
            //Значение можно не писать
            <h1>Your Balance: <strong></strong></h1>
            <p>On dices: <strong id="dice1result">4</strong>, <strong id="dice2result">4</strong></p>
            //Значение можно не писать
            <p id="resultText">You lost <strong id="betAmount"></strong></p>
        </div> */

/*//Значение можно не писать
<h1>Your bet: <strong></strong></h1>
//Значение можно не писать
<p>On dices: <strong id="dice1result"></strong>, <strong id="dice2result"></strong></p>
//Значение можно не писать
<p>Your point <strong id="betAmount"></strong></p>*/
