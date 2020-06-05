const breath_circle = document.getElementById('breath-circle');
const listen_circle = document.getElementById('listen-circle');
const be_circle = document.getElementById('be-circle');
const section_container = document.getElementById('section-container');

const displayBreathSection = () => {
  section_container.innerHTML = `
  <section class="breath-section">
    <div id="breath-container">
      <div class="circle">
        <p id="text" class="breath-text"></p>
      </div>  
      <div class="pointer-container">
        <span class="pointer"></span>
      </div>
      <div class="gradient-circle"></div>
    </div>
  </section>
  `;

  const container = document.getElementById('breath-container');
  const text = document.getElementById('text');

  const totalTime = 7500;
  const breatheTime = (totalTime / 5) * 2;
  const holdTime = totalTime / 5;

  breathAnimation();

  function breathAnimation() {
    text.innerText = 'Breathe In!';
    container.className = 'container grow';

    setTimeout(() => {
      text.innerText = 'Hold';

      setTimeout(() => {
        text.innerText = 'Breathe Out!';
        container.className = 'container shrink';
      }, holdTime);
    }, breatheTime);
  }

  setInterval(breathAnimation, totalTime);
};

const displayListenSection = () => {
  section_container.innerHTML = `
  <section class="listen-section">
    <div class="audio-container">
      <audio controls class="audio-player">
        <source src="music/ambient01.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
    </div>
  </section>
  `;
};

const startTimer = (duration, display) => {
  const timer = duration;
  setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    display.textContent = minutes + ':' + seconds;

    if (timer < 0) {
      timer = duration;
    }
  }, 1000);
};

const displayBeSection = () => {
  section_container.innerHTML = `
  <section class="be-section">
    <div class="timer-container">
      <p>Just be for 5 minutes</p>
      <div id="time">05:00</div>
    </div>
  </section>
  `;

  const fiveMinutes = 60 * 5;
  display = document.querySelector('#time');
  display.addEventListener('click', startTimer(fiveMinutes, display));
};

breath_circle.addEventListener('click', displayBreathSection);
listen_circle.addEventListener('click', displayListenSection);
be_circle.addEventListener('click', displayBeSection);
