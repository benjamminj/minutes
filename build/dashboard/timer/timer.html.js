let utils = require('../utils')();

module.exports = {
  timerHTML() {
    return `
      <button class="cancel">
        <i class="fa fa-times" aria-hidden="true"></i>
      </button>
      <div class="timer">
        <h2>
          <span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span>
        </h2>
        <button class="start">Start</button>
        <button class="stop">Stop</button>
      </div>
    `;
  },

  divideTimeHTML(time) {
    let pad = utils.addLeadingZeroes;

    let hours = pad(divideTime(time, 360));
    let minutes = pad(divideTime(time - (hours * 360), 60));
    let seconds = pad(divideTime(time - (hours * 360) - (minutes * 60)));

    function divideTime(initialTime, division = 1) {
      return Math.floor(initialTime / division);
    }

    return `<span class="hours">${hours}</span>:<span class="minutes">${minutes}</span>:<span class="seconds">${seconds}</span>`;
  }
};