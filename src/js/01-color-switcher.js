function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId

document.querySelector('[data-start]').addEventListener('click', () => {
    document.querySelector('[data-start]').disabled = true;
    document.querySelector('[data-stop]').disabled = false;
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
});

document.querySelector('[data-stop]').addEventListener('click', () => {
    clearInterval(intervalId);
    document.querySelector('[data-start]').disabled = false;
    document.querySelector('[data-stop]').disabled = true;
});
