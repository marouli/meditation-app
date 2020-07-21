const be_circle = document.getElementById('be-circle');

function displayBeSection() {
  main.innerHTML = `
  <section class="section">
    <div class="section-background section-be"></div>
    <div class="timer-container">
      <h1>Choose your meditation time</h1>
      <div class="timer__controls">
        <button data-time="600" class="timer__button">10 minutes</button>
        <button data-time="1200" class="timer__button">20 minutes</button>
        <button data-time="2400" class="timer__button">40 minutes</button>
        <button data-time="3600" class="timer__button">1 hour</button>
        <form name="customForm" id="custom">
          <input type="text" name="minutes" placeholder="Enter other in minutes">
        </form>
      </div>
      <div class="display">
        <h2 class="display__time-left"></h2>
      </div>
    </div>
  </section>
  `;

  const timerDisplay = document.querySelector('.display__time-left');
  const buttons = document.querySelectorAll('[data-time]');
  let countdown;

  function timer(seconds) {
    // clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      // check if we should stop it so that it doesn't go to negative numbers
      if (secondsLeft < 0) {
        clearInterval(countdown);
        return;
      }

      if (secondsLeft === 0) {
        const snd = new Audio('music/tibetan-bowl.wav');
        snd.play();
      }
      // display it
      displayTimeLeft(secondsLeft);
    }, 1000);
  }

  function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${
      remainderSeconds < 10 ? '0' : ''
    }${remainderSeconds}`;
    if (seconds === 0) {
      timerDisplay.textContent = `Namaste`;
    } else {
      timerDisplay.textContent = display;
    }
  }

  function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
  }

  buttons.forEach((button) => button.addEventListener('click', startTimer));
  document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
  });
}

be_circle.addEventListener('click', displayBeSection);
