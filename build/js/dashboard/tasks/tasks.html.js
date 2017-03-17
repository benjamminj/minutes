let timeHTML = require('../timer/timer.html');

module.exports = {
  editTaskHTML(task) {
    let currentTitle = task.find('.title').html();
    let currentDescription = task.find('.description').html() || '';
    let formattedDescription = currentDescription.replace('<br>', '\n');
    let time = task.find('.time').html();
    let date = task.find('.date').html();

    return `
      <input type="text" class="title" value="${currentTitle}" placeholder="Title">
      <!-- <h4 class="date">${date}</h4> -->
      <!-- <h4 class="time">${time}</h4> -->
      <!-- <h4 class="description-heading">Description</h4> -->
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
        ${this.innerTaskHTML(task)}
      </div>
    `;
  },

  // TO DO -- refactor so that it only takes a single task as an arg.
  innerTaskHTML({ title, date, time, description, _id }) {
    date = (new Date(date)).toDateString();

    let descriptionHTML;
    if (!description) {
      descriptionHTML = '';
    } else {
      descriptionHTML = description.replace(/\n/g, '<br>');
    }

    return `
      <input type="checkbox" class="info-toggler" id="info-${_id}" />
      <input type="checkbox" class="edit-item-toggler" id="edit-${_id}" />

      <div class="action-buttons">
        <label for="info-${_id}">Info</label>
        <label for="edit-${_id}">Edit</label>
        <button>Delete</button>
      </div>

      <div class="task-content">
        <div className="task-default">
          <h3 class="title">${title}</h3>
          <h4 class="date">${date}</h4>
          <h1 class="time">${timeHTML.divideTimeHTML(time)}</h4>
        </div>
        <div className="task-info" hidden>
          <h3 class="title">${title}</h3>
          <h4 class="date">${date}</h4>
          <h1 class="time">${timeHTML.divideTimeHTML(time)}</h4>
          <p class="description">${descriptionHTML}</p>
        </div>
        <div className="task-edit" hidden>
          <input type="text" placeholder="Title" value="${title}" />
          <textarea name="description" placeholder="Description">${description || ''}</textarea>
        </div>
      </div>
    `;
  }
};
