let timeHTML = require('../timer/timer.html');

const saveIcon = `
  <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
  </svg>
`;

const editIcon = `
  <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </svg>
`;

const deleteIcon = `
  <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </svg>
`;

const infoIcon = `
  <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
  </svg>
`;

const closeIcon = `
  <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </svg>
`;

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
      <input hidden type="checkbox" class="info-toggler" id="info-${_id}" />
      <input hidden type="checkbox" class="edit-toggler" id="edit-${_id}" />

      <div class="task-content">
        <div class="task-default">
          <div class="task-default-header">
            <h4 class="date">${date}</h4>
            <h3 class="time">${timeHTML.divideTimeHTML(time)}</h3>
          </div>
          <h3 class="title">${title}</h3>
        </div>
        <div class="task-info task-modal" hidden>
          <div class="task-modal-content">
            <h4 class="date">${date}</h4>
            <label for="info-${_id}" class="close-icon">${closeIcon}</label>
            <h1 class="time">${timeHTML.divideTimeHTML(time)}</h4>
            <h3 class="title">${title}</h3>
            <p class="description">${descriptionHTML}</p>
          </div>
        </div>
        <div class="task-edit task-modal" hidden>
          <div class="task-modal-content">
            <button class="task-edit-save">${saveIcon}</button>
            <label for="edit-${_id}" class="close-icon">${closeIcon}</label>
            <input required class="edit-title" type="text" placeholder="Title" value="${title}" />
            <textarea class="edit-description" name="description" placeholder="Description" cols="50" rows="12">${description || ''}</textarea>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <label for="info-${_id}">${infoIcon}</label>
        <label for="edit-${_id}">${editIcon}</label>
        <button class="delete-btn">${deleteIcon}</button>
      </div>
    `;
  }
};
