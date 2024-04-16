import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

function convertMS(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
      return String(value).padStart(2, '0');
}
let intervalId;

const resetCounter = () => {
    clearInterval(intervalId);
    document.querySelector('[data-days]').textContent = '00';
    document.querySelector('[data-hours]').textContent = '00';
    document.querySelector('[data-minutes]').textContent = '00';
    document.querySelector('[data-seconds]').textContent = '00';
};

const dateTimePicker = flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const currentDate = new Date();
        if (selectedDate <= currentDate) {
            Notiflix.Notify.failure('Please choose a date in the future');
            document.querySelector('[data-start]').disabled = true;
        } else {
            document.querySelector('[data-start]').disabled = false;
            resetCounter();
        }
    },
});

document.querySelector('[data-start]').addEventListener('click', () => {
    const endDate = dateTimePicker.selectedDates[0];
    const currentDate = new Date();

    intervalId = setInterval(() => {
        const remainingTime = endDate - currentDate;
        if (remainingTime <= 0) {
            clearInterval(intervalId);
            return;
        }
        const { days, hours, minutes, seconds } = convertMS(remainingTime);
        document.querySelector('[data-days]').textContent = addLeadingZero(days);
        document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
        document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
        document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);

        currentDate.setSeconds(currentDate.getSeconds() + 1);
    }, 1000);
});