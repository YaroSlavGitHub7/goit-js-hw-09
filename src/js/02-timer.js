/**Напиши скрипт таймера, который ведёт обратный отсчет до определенной даты. 
 * Такой таймер может использоваться в блогах и инет-магах, страницах регистрации событий, во время ТО и т. д.
 * В HTML есть готовая разметка таймера, поля выбора конечной даты и кнопки, 
 при клике по которой таймер должен запускаться. Добавь минимальное оформление элементов интерфейса.
 * Используй библиотеку flatpickr для того чтобы позволить пользователю 
 кроссбраузерно выбрать конечную дату и время в одном элементе интерфейса.
 * Библиотека  flatpickr ожидает что её инициализируют на элементе input[type="text"], 
 поэтому добавили в HTML документ поле input#datetime-picker. */

/*из документации*/
import flatpickr from 'flatpickr';
/* импорт стилей*/
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
/*кнопки и окошки*/
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
/*начальные значения*/
let selectedDate = null;
let intervalId = null;
startBtn.disabled = true; /*блокируем кнопку старта*/
/*вешаем слушателей на кнопки*/
startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);




/* Вторым аргументом функции flatpickr(selector, options) передаем необязательный объект параметров. */
const options = {
  enableTime: true, /*Включает выбор времени*/
  time_24hr: true, /*Отображает средство выбора времени в 24-часовом режиме без выбора AM/PM, если включено.*/
  defaultDate: new Date(), /*Устанавливает начальную выбранную дату*/
  minuteIncrement: 1, /*Регулирует шаг ввода времени (включая прокрутку)*/
  onClose(selectedDates) { /*метод onClose() обрабатываеn дату выбранную пользователем,если дата не в будущем - failure, иначе - success */
    if (selectedDates[0].getTime() < Date.now()) {
      return Notify.failure('Please choose a date in the future');

    } else {
      Notify.success('The selected date is valid!');
      console.log(selectedDates[0]);
    }
  },
};
/*Используем библиотеку flatpickr чтобы кроссбраузерно выбрать конечную дату и время*/
const calendar = flatpickr('#datetime-picker', options);

/* Запускаем таймер */
function start() {
  const startTime = selectedDate;
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = startTime - currentTime;/*разница между выбраным и текущим временем*/
    const { days, hours, minutes, seconds } = convertMs(deltaTime); 

    if (deltaTime < 0) {
      clearInterval(intervalId);
      return;
    }
    startBtn.disabled = true; /*???*/
    updateTimer({ days, hours, minutes, seconds });
  }, 1000);
}

/* Останавливаем и обнуляем таймер */
function stop() {
  startBtn.disabled = true;
  calendar.setDate(Date.now());
  clearInterval(intervalId);
  const time = convertMs(0);
  updateTimer(time);
}

/* Выбираем время */
function updateTimer({ days, hours, minutes, seconds }) {
    dataDays.textContent = `${ days }`;
    dataHours.textContent = `${ hours }`;
    dataMinutes.textContent = `${ minutes }`;
    dataSeconds.textContent = `${ seconds }`;
}

/*Приводим время к двухзначному числу*/

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

/* Для подсчета значений используем функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах. */
/* Функция convertMs() возвращает объект с рассчитанным оставшимся временем до конечной даты. */

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}






// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const startBtn = document.querySelector('[data-start]');
// const stopBtn = document.querySelector('[data-stop]');
// const dataDays = document.querySelector('[data-days]');
// const dataHours = document.querySelector('[data-hours]');
// const dataMinutes = document.querySelector('[data-minutes]');
// const dataSeconds = document.querySelector('[data-seconds]');

// let selectedDate = null;
// let intervalId = null;
// startBtn.disabled = true;

// startBtn.addEventListener('click', start);
// stopBtn.addEventListener('click', stop);

// /* Вторым аргументом функции flatpickr(selector, options) передаем необязательный объект параметров. */

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,

//   /* В методе onClose() обрабатываем дату выбранную пользователем: 
//   если пользователь не выбрал дату в будущем - failure, если верная дата - success*/

//   onClose(selectedDates) {
//     if (selectedDates[0].getTime() < Date.now()) {
//       return Notify.failure('Please choose a date in the future');

//     } else {
//       Notify.success('The selected date is valid!');

//       startBtn.disabled = false;
//       selectedDate = selectedDates[0].getTime();
//     }
//   },
// };

// const calendar = flatpickr('#datetime-picker', options);

// /* Запускаем/останавливаем таймер */

// function start() {
//   const startTime = selectedDate;

//   intervalId = setInterval(() => {
//     const currentTime = Date.now();
//     const deltaTime = startTime - currentTime;

//     const { days, hours, minutes, seconds } = convertMs(deltaTime);

//     if (deltaTime < 0) {
//       clearInterval(intervalId);
//       return;
//     }

//     startBtn.disabled = true;

//     updateTimer({ days, hours, minutes, seconds });
//   }, 1000);
// }

// /* Останавливаем/очищаем таймер */

// function stop() {
//   startBtn.disabled = true;

//   calendar.setDate(Date.now());

//   clearInterval(intervalId);

//    const time = convertMs(0);
//    updateTimer(time);

// }

// /* Выбираем время */

// function updateTimer({ days, hours, minutes, seconds }) {
//     dataDays.textContent = `${ days }`;
//     dataHours.textContent = `${ hours }`;
//     dataMinutes.textContent = `${ minutes }`;
//     dataSeconds.textContent = `${ seconds }`;
// }

// /* Перед отрисовкой интефрейса форматируем значение. */

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// /* Для подсчета значений используем функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах. */
// /* Функция convertMs() возвращает объект с рассчитанным оставшимся временем до конечной даты. */

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = addLeadingZero(Math.floor(ms / day));
//   // Remaining hours
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

//   return { days, hours, minutes, seconds };
// }
