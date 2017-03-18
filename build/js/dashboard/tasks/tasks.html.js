let timeHTML = require('../timer/timer.html');

const saveIcon = `
  <svg version="1.1" width="24" height="24" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 49 49">
    <path d="M39.914,0H37.5h-28h-9v49h7h33h8V8.586L39.914,0z M35.5,2v14h-24V2H35.5z M9.5,47V28h29v19H9.5z M46.5,47h-6V26h-33v21h-5
      V2h7v16h28V2h1.586L46.5,9.414V47z"/>
    <path d="M13.5,33h7c0.553,0,1-0.447,1-1s-0.447-1-1-1h-7c-0.553,0-1,0.447-1,1S12.947,33,13.5,33z"/>
    <path d="M23.5,35h-10c-0.553,0-1,0.447-1,1s0.447,1,1,1h10c0.553,0,1-0.447,1-1S24.053,35,23.5,35z"/>
    <path d="M25.79,35.29c-0.181,0.189-0.29,0.45-0.29,0.71s0.109,0.52,0.29,0.71C25.979,36.89,26.229,37,26.5,37
      c0.26,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71s-0.11-0.521-0.29-0.71C26.84,34.92,26.16,34.92,25.79,35.29z"/>
    <path d="M33.5,4h-6v10h6V4z M31.5,12h-2V6h2V12z"/>
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
        <div class="task-info" hidden>
          <label for="info-${_id}">X</label>
          <h3 class="title">${title}</h3>
          <h4 class="date">${date}</h4>
          <h1 class="time">${timeHTML.divideTimeHTML(time)}</h4>
          <p class="description">${descriptionHTML}</p>
        </div>
        <div class="task-edit" hidden>
          <label for="edit-${_id}">X</label>
          <input type="text" placeholder="Title" value="${title}" />
          <textarea name="description" placeholder="Description">${description || ''}</textarea>
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
