let timeHTML = require('../timer/timer.html');

module.exports = {
  editTaskHTML(task) {
    let currentTitle = task.find('.title').html();
    let currentDescription = task.children('.description').html() || '';
    let formattedDescription = currentDescription.replace('<br>', '\n');

    return `
      <input type="text" class="title" value="${currentTitle}" placeholder="Title">
      <textarea name="" id="edit-description" cols="30" rows="4" placeholder="Add a Description">${formattedDescription}</textarea>  
      <div class="edit-buttons">
        <button class="cancel-changes">Cancel</button>
        <button class="save-changes">Save</button>        
      </div>  
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

    return `
      <div class="task-heading">
        <h3 class="title">${title}</h3>
        <button class="more"><i class="material-icons" aria-label="More">expand_more</i></button>
        <div class="more-actions">
          <button class="edit"><i class="material-icons">mode_edit</i><h4>Edit</h4></button>
          <hr>
          <button class="delete"><i class="material-icons">delete_forever</i><h4>Delete</h4></button>
        </div>
        <div class="page-overlay"></div>
      </div>
      <h4 class="date">${date}</h4>
      <h1 class="time">${timeHTML.divideTimeHTML(time)}</h4>
      <p class="description">${description}</p>
    `;
  },

};