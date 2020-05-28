const breath_circle = document.getElementById('breath-circle');
const listen_circle = document.getElementById('listen-circle');
const be_circle = document.getElementById('be-circle');
const breath_container = document.getElementById('breath-container');
const listen_container = document.getElementById('listen-container');
const be_container = document.getElementById('be-container');

const displayBreathSection = () => {
  listen_container.innerHTML = ``;
  be_container.innerHTML = ``;
  breath_container.innerHTML = `
  <section class="breath-section">
    <div id="container">
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

  const container = document.getElementById('container');
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
  breath_container.innerHTML = ``;
  be_container.innerHTML = ``;
  listen_container.innerHTML = `
  <section class="listen-section">
    <audio controls>
      <source src="music/ambient01.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </section>
  `;
};

breath_circle.addEventListener('click', displayBreathSection);
listen_circle.addEventListener('click', displayListenSection);
