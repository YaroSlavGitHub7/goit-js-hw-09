/**В HTML есть готовая разметка таймера, поля выбора конечной даты и кнопки, 
 при клике по которой таймер должен запускаться. Добавь минимальное оформление элементов интерфейса.
 * Используй библиотеку flatpickr для того чтобы позволить пользователю 
 кроссбраузерно выбрать конечную дату и время в одном элементе интерфейса.
 * Библиотека  flatpickr ожидает что её инициализируют на элементе input[type="text"], 
 поэтому добавили в HTML документ поле input#datetime-picker. */

// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(selector, options)