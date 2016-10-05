let utils = require('./utils')();

module.exports = {  
  timerClosePromptHTML() {
    return `
      <div class="timer-close-prompt">
        <h2>Are you sure you want to end the timer? You will lose any time currently on the clock</h2>
        <button class="yes">Yes, I would like to cancel this timer</button>
        <button class="no">No, I want to keep running the timer</button>
      </div>
    `;
  },

  // TO DO -- add a time as function argument. generate the html for the time into HH:MM:SS
  timerSaveHTML(seconds) {
    return `
      <div class="timer-save">
        <form action="" id="save-task">
          <input type="text" placeholder="Choose a Title" class="title">
          <h4 class="time">
            ${this.displayTimeHTML(seconds)}
          </h4>
          <input type="text" placeholder="Add a Description" class="description">
          <button class="cancel-save">Cancel</button>
          <button type="submit">Save</button>
        </form>
      </div>
    `;
  },
};
