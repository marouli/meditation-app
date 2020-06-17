const be_circle = document.getElementById('be-circle');
const timerForm = document.querySelector('.timer-form');
const timerInput = document.querySelector('.timer-input');
const timerError = document.querySelector('.timer-input-error');
const timerButton = document.querySelector('.timer-button');
const clockContainer = document.querySelector('.clock-container');
const clockEl = document.querySelector('.clock');
const clockButtons = document.querySelector('.clock-buttons');
const playButton = document.querySelector('.play');
const pauseButton = document.querySelector('.pause');
const timesUpAudio = document.querySelector('.times-up-sound');

let meditationTimer;
let seconds, secondsLeft;

function displayTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const displaySeconds = seconds % 60;
  clockEl.innerText = `${('0' + hours).slice(-2)}:${('0' + minutes).slice(
    -2
  )}:${('0' + displaySeconds).slice(-2)}`;
}

function toggleTimeForm() {
  timerForm.style.display =
    timerForm.style.display === 'block' ? 'none' : 'block';
}

function toggleClock() {
  clockContainer.style.display =
    clockContainer.style.display === 'block' ? 'none' : 'block';
}

function pause(btn) {
  // enable play button, disable pause button
  btn.disabled = 'true';
  playButton.disabled = '';
  clearInterval(meditationTimer);
}

function enablePauseButton() {
  if (pauseButton.disabled) {
    playButton.disabled = 'true';
    pauseButton.disabled = '';
  }
}

function play(btn) {
  enablePauseButton();
  // btn.classList.add('inactive-button');
  // pauseButton.classList.remove('inactive-button');
  timer(secondsLeft);
}

function stop() {
  clearInterval(meditationTimer);
  meditationTimer = null;
  toggleClock();
  toggleTimeForm();
  // The pause button must be enabled when stopping the game
  enablePauseButton();
}

function restart() {
  // The pause button must be enabled upon restart.
  enablePauseButton();
  clearInterval(meditationTimer);
  timer(seconds);
}

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;
  if (!meditationTimer) {
    toggleTimeForm();
    toggleClock();
  }

  displayTime(seconds);
  meditationTimer = setInterval(() => {
    secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft <= 0) {
      timesUpAudio.play();
      clearInterval(meditationTimer);
      // openModal();
    }
    displayTime(secondsLeft);
  }, 1000);
}

function processTimerForm(e) {
  const timerInputValue = timerInput.value;

  if (meditationTimer) {
    clearInterval(meditationTimer);
  }
  seconds = timerInputValue * 60;
  timer(seconds);
}

function displayBeSection() {
  main.innerHTML = `
  <section class="section">
    <div class="section-background section-be"></div>
    <div class="timer-container">
      <form class="timer-form" id="timer-form">
        <label for="time">Set your minutes</label>
        <input type="number" class="timer-input" name="time" id="time" placeholder="20" min="1" max="999" required>
        <button class="button timer-button">Start Meditation</button>
      </form>
      <div class="clock-container">
        <div class="clock"></div>
        <ul class="clock-buttons">
            <li class="play"><button disabled class="clock-button" aria-label="Play"><i aria-hidden class="fas fa-play"></i></button></li>
            <li class="pause"><button class="clock-button" aria-label="Pause"><i aria-hidden class="fas fa-pause"></i></button></li>
            <li class="stop"><button class="clock-button" aria-label="Stop"><i aria-hidden class="fas fa-stop"></i></button></li>
            <li class="restart"><button class="clock-button" aria-label="Restart"><i aria-hidden class="fas fa-redo"></i></button></li>
        </ul>
      </div>
    </div>
  </section>
  `;

  timerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    processTimerForm(e);
  });

  clockButtons.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;
    if (!clockButtons.contains(button)) return;
    if (button.disabled) return;
    if (button.classList.contains('play')) {
      play(button);
    } else if (button.classList.contains('pause')) {
      pause(button);
    } else if (button.classList.contains('stop')) {
      stop();
    } else if (button.classList.contains('restart')) {
      restart();
    }
  });
}

be_circle.addEventListener('click', displayBeSection);
