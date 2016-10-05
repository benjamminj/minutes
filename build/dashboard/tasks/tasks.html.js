let timeHTML = require('../timer/timer.html');

module.exports = {
  editTaskHTML(task) {
    let currentTitle = task.children('.title').html();
    let currentDescription = task.children('.description').html() || 'Add a description';
    let time = task.children('.time').html();
    let date = task.children('.date').html();

    return `
      <input type="text" class="title" placeholder="${currentTitle}">
      <h4 class="date">${date}</h4>
      <h4 class="time">${time}</h4>
      <input type="text" class="description" placeholder="${currentDescription}">
      <button class="cancel-changes">Cancel Changes</button>
      <button class="save-changes">Save Changes</button>
    `;
  },

  taskHTML(task) {
    return `
      <div class="task" id="${task._id}">
        ${this.innerTaskHTML(task.title, task.date, task.time, task.description)}
      </div>
    `;
  },

  innerTaskHTML(title, date, time, description) {
    if (!description) {
      description = '';
    }

    return `
      <h3 class="title">${title}</h3>
      <h4 class="date">${date}</h4>
      <h4 class="time">${timeHTML.divideTimeHTML(time)}</h4>
      <p class="description">${description}</p>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    `;
  },

};