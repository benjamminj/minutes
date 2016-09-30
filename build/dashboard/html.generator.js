module.exports = function(task) {

  return '<div class="task" id="' + task._id + '"><h3>' + task.title +
    '</h3><button class="edit-title">Edit Title</button><h4>' + task.date +
    '</h4><h4>' + task.time + '</h4><p>' + task.description +
    '</p><button class="edit-desc">Edit Description</button><button class="delete">Delete</button></div>';

  return `
  <div class="task" id="${task.id}">
  	<h3>${task.title}</h3>
  	<button class="edit-title">Edit Title</button>
  	<h4>${task.date}</h4>
  	<h4>${task.time}</h4>
  	<p>task.description</p>
  	<button class="edit-description">Edit Description</button>
  	<button class="delete">Delete</button>
	</div>
	`
}; 