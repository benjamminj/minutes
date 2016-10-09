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

  timerClosePromptHTML() {
    return `
      <div class="timer-close-prompt">
        <h2>Are you sure you want to end the timer? You will lose any time currently on the clock</h2>
        <button class="yes">Yes, I would like to cancel this timer</button>
        <button class="no">No, I want to keep running the timer</button>
      </div>
    `;
  },

  timerSaveHTML(seconds) {
    return `
      <div class="timer-save">
        <form action="" id="save-task">
          <input type="text" placeholder="Choose a Title" class="title">
          <h4 class="time">
            ${this.divideTimeHTML(seconds)}
          </h4>
          <textarea placeholder="Add a Description" class="description" rows="10" cols="50"></textarea>
          <button class="cancel-save">Cancel</button>
          <button type="submit">Save</button>
        </form>
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
  },
};
