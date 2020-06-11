const main = document.getElementById('main');
const breath_circle = document.getElementById('breath-circle');
const listen_circle = document.getElementById('listen-circle');

const displayBreathSection = () => {
  main.innerHTML = `
  <section class="section">
    <div class="section-background section-breath"></div>
    <div class="breath-container">
      <div id="breath-container">
        <div class="circle">
          <p id="text" class="breath-text"></p>
        </div>  
        <div class="pointer-container">
          <span class="pointer"></span>
        </div>
        <div class="gradient-circle"></div>
      </div>
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
  main.innerHTML = `
  <section class="section">
    <div class="section-background section-listen"></div>
    <div class="audio-container">
      <audio controls class="audio-player">
        <source src="music/ambient01.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
    </div>
  </section>
  `;
};

breath_circle.addEventListener('click', displayBreathSection);
listen_circle.addEventListener('click', displayListenSection);
