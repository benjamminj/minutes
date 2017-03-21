let utils = require('../utils')();

module.exports = {
  timerHTML() {
    return `
      <div class="timer">
        <h2 class="time">
          <span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span>
        </h2>
        <div class="timer-buttons">
          <button class="start">Start</button>
          <button class="save">Save</button>
        </div>
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
          <h2 class="time">
            ${this.divideTimeHTML(seconds)}
          </h2>
          <input type="text" placeholder="Choose a Title" class="title top">
          <textarea placeholder="Add a Description" class="description bottom" rows="10" cols="50"></textarea>
          <div class="timer-buttons">
            <button class="cancel-save">Cancel</button>
            <button type="submit" class="submit">Save</button>
          </div>
        </form>
      </div>
    `;
  },

  divideTimeHTML(time) {
    let pad = utils.addLeadingZeroes;

    let hours = pad(divideTime(time, (60 * 60)));
    let minutes = pad(divideTime(time - (hours * (60 * 60)), 60));
    let seconds = pad(divideTime(time - (hours * (60 * 60)) - (minutes * 60)));

    function divideTime(initialTime, division = 1) {
      return Math.floor(initialTime / division);
    }

    return `<span class="hours">${hours}</span>:<span class="minutes">${minutes}</span>:<span class="seconds">${seconds}</span>`;
  },
};
