/*Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> 
на случайное значение используя инлайн стиль. При нажатии на кнопку «Stop», 
изменение цвета фона должно останавливаться.
на кнопку «Start» можно нажать бесконечное количество раз,
пока изменение темы запушено, кнопка «Start» не активна (disabled)*/

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

// let timerId = null;

/* кнопка «Start» активна */
startBtn.disabled = false;
stopBtn.disabled = true;

/*Для генерации случайного цвета*/
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

/*Метод setInterval() - способ повторения кода с установленным промежутком времени повторений */
startBtn.addEventListener('click', () => {
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    /* кнопка «Start» не активна*/
    startBtn.disabled = true;
    stopBtn.disabled = false;
});
/*клик на кнопку «Stop» вызовем clearInterval() и передадим идентификатор интервала который надо остановить*/
stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    console.log(timerId);

    startBtn.disabled = false;
    stopBtn.disabled = true;
})

