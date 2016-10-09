let timeHTML = require('../timer/timer.html');

module.exports = {
  editTaskHTML(task) {
    let currentTitle = task.find('.title').html();
    let currentDescription = task.children('.description').html() || '';
    let time = task.children('.time').html();
    let date = task.find('.date').html();

    console.log(currentTitle, currentDescription, time, date);

    return `
      <input type="text" class="title" placeholder="${currentTitle}">
      <h4 class="date">${date}</h4>
      <h4 class="time">${time}</h4>
      <textarea name="" id="#edit-description" class="description" cols="30" rows="4" placeholder="Add a Description">${currentDescription}</textarea>
      <button class="cancel-changes">Cancel Changes</button>
      <button class="save-changes">Save Changes</button>
    `;
  },

  taskHTML(task) {
    return `
      <div class="task" id="${task._id}">
        ${this.innerTaskHTML(task.title, task.date, task.time, task.description, task._id)}
      </div>
    `;
  },

  innerTaskHTML(title, date, time, description) {
    date = (new Date(date)).toDateString();
    if (!description) {
      description = '';
    } else {
      description = description.replace(/\n/g, '<br>');
    }

    // Move the more-actions div to make the margins work out better?
    // Maybe move to directly below the task-heading, or directly above the page overlay./

    return `
      <div class="task-heading">
        <h3 class="title">${title}</h3>
        <button class="more"><i class="fa fa-angle-down" aria-label="More"></i></button>
        <div class="more-actions">
          <button class="edit"><i class="fa fa-pencil"></i> Edit</button>
          <hr>
          <button class="delete"><i class="fa fa-trash"></i> Delete</button>
        </div>
        <div class="page-overlay"></div>
      </div>
      <h4 class="date">${date}</h4>
      <h1 class="time">${timeHTML.divideTimeHTML(time)}</h4>
      <p class="description">${description}</p>
    `;
  },

};