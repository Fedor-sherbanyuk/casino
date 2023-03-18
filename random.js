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
   const s=max - min + 1;
   const ss=Math.random()*s;
   const sss=Math.floor(ss);
   const ssss=sss+min;
}
getRandomIntInclusive(1,6)