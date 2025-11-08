const hr = document.querySelector('.hand-hr .hand');
const min = document.querySelector('.hand-min .hand');
const sec = document.querySelector('.hand-sec .hand');
const TODAY = document.getElementById('today');

let deg_hr = 0;
let deg_min = 0;
let deg_sec = 0;
let intervalSec = 1000;
let clockInterval;

// Initialize clock to current time
function initializeClock() {
    const now = new Date();
    deg_sec = now.getSeconds() * 6;
    deg_min = now.getMinutes() * 6 + now.getSeconds() * 0.1;
    deg_hr = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;

    updateClock();
}

// Rotate hands
function updateClock() {
    sec.style.transform = `rotate(${deg_sec}deg)`;
    min.style.transform = `rotate(${deg_min}deg)`;
    hr.style.transform = `rotate(${deg_hr}deg)`;
}

// Start clock ticking
function startClock() {
    clearInterval(clockInterval);
    clockInterval = setInterval(() => {
        deg_sec += 6;
        deg_min += 0.1;
        deg_hr += 1 / 120;
        updateClock();
    }, intervalSec);
}

// Reset clock
function reset() {
    initializeClock();
    intervalSec = 1000;
    startClock();
}



// Set manual time
function setTIme() {
    const input = document.querySelector('.set-time').value;
    if (!input) return;
    const [hoursStr, minutesStr] = input.split(':');
    const hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);

    deg_sec = 0;
    deg_min = minutes * 6;
    deg_hr = (hours % 12) * 30 + minutes * 0.5;
    updateClock();
}

// Display current date
function setDate(){
    const today = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = days[today.getDay()];
    const date = today.getDate();
    const month = months[today.getMonth()];
    TODAY.innerHTML = `${day} ${date} ${month}`;
}

// Start everything
initializeClock();
startClock();
setDate();
