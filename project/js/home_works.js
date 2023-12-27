// GMAIL CHECKER

const gmail_input = document.querySelector('#gmail_input')
const gmail_button = document.querySelector('#gmail_button')
const gmail_result = document.querySelector('#gmail_result')

const regExp = /[a-z0-9]{6}@gmail.com$/gi

gmail_button.onclick = () => {
    if (regExp.test(gmail_input.value)) {
        gmail_result.innerHTML = 'OK'   
        gmail_result.style.color = 'green'
    } else {
        gmail_result.innerHTML = 'NOT OK'
        gmail_result.style.color = 'red'
    }
}

// MOVE BLOCK

const childBlock = document.querySelector('.child_block');

const parentFreeWidth = 449;

let positionX = 0;
let positionY = 0;

const moveBlock = () => {
    if (positionX < parentFreeWidth && positionY === 0) {
        positionX++
        childBlock.style.left = `${positionX}px`
        setTimeout(moveBlock, 5)
    } else if (positionX >= parentFreeWidth && positionY < parentFreeWidth) {
        positionY++
        childBlock.style.top = `${positionY}px`
        setTimeout(moveBlock, 5)
    } else if (positionX > 0) {
        positionX--
        childBlock.style.left = `${positionX}px`
        setTimeout(moveBlock, 5)
    } else {
        positionY--
        childBlock.style.top = `${positionY}px`
        setTimeout(moveBlock, 5)
    }
}

moveBlock()

// STOPWATCH

const counter = document.querySelector('#secondsS');
const watch_start = document.querySelector('#start');
const watch_stop = document.querySelector('#stop');
const watch_reset = document.querySelector('#reset');

let seconds = 0;
let interval;

const updateCounter = () => {
    counter.textContent = seconds;
};

const startCounter = () => {
    interval = setInterval(() => {
        seconds++;
        updateCounter();
    }, 1000);
};

const stopCounter = () => {
    clearInterval(interval);
};

const resetCounter = () => {
    seconds = 0;
    updateCounter();
};

watch_start.onclick = startCounter;
watch_stop.onclick = stopCounter;
watch_reset.onclick = resetCounter;

updateCounter();

