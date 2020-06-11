const be_circle = document.getElementById('be-circle');

const startTimer = (duration, display) => {
  let timer = duration,
    minutes,
    seconds;
  setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    display.textContent = minutes + ':' + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
  console.log(timer);
};

const displayBeSection = () => {
  main.innerHTML = `
  <section class="section">
    <div class="section-background section-be"></div>
    <div class="timer-container">
      <form class="timer-form">
      <label for="time">Time (in minutes):</label>
        <input type="number" class="time-input" name="time" id="time" placeholder="20" min="1" max="999" required>
        <div class="time-input-error"></div>
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

  const fiveMinutes = 60 * 5;
  display = document.querySelector('#time');
  display.addEventListener('click', startTimer(fiveMinutes, display));
};

be_circle.addEventListener('click', displayBeSection);
