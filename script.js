const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');

const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');

const lapsList = document.getElementById('laps-list');

let startTime = null;
let elapsedTime = 0;  // in ms
let timerInterval = null;

function timeToString(time) {
  const diff = time;
  const hrs = Math.floor(diff / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  const ms = diff % 1000;

  const formatted = {
    hrs: String(hrs).padStart(2, '0'),
    mins: String(mins).padStart(2, '0'),
    secs: String(secs).padStart(2, '0'),
    ms: String(ms).padStart(3, '0')
  };
  return formatted;
}

function print(txt) {
  hoursEl.textContent = txt.hrs;
  minutesEl.textContent = txt.mins;
  secondsEl.textContent = txt.secs;
  millisecondsEl.textContent = txt.ms;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10);

  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  lapBtn.disabled = false;
}

function pause() {
  clearInterval(timerInterval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  print(timeToString(elapsedTime));
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;

  // clear laps
  lapsList.innerHTML = '';
}

function lap() {
  const lapTime = timeToString(elapsedTime);
  const li = document.createElement('li');
  li.textContent = `${lapTime.hrs}:${lapTime.mins}:${lapTime.secs}.${lapTime.ms}`;
  lapsList.appendChild(li);
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
