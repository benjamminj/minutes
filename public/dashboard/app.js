var rootURL = '//localhost:5000/';

function generateTaskHTML(task) {
	return '<div class="task" id="' + task._id + '"><h3>' + task.title + 
		'</h3><button class="edit-title">Edit Title</button><h4>' + task.date + 
		'</h4><h4>' + task.time + '</h4><p>' + task.description + 
		'</p><button class="edit-desc">Edit Description</button><button class="delete">Delete</button></div>';
}

function loadTasks() {
	var url = rootURL + 'api/tasks';
	$.getJSON(url)
	.done(function(tasks) {
		tasks.forEach(function(task) {
			// Change html to be a ul
			$('#tasks-list').append(generateTaskHTML(task));
		});
	})
	.fail(function(err) {
		// Eventually need to do something to handle this on the frontend?
		console.log('Oh no!', err);
	});
}

function deleteTask(id) {
	var url = rootURL + 'api/tasks/delete/' + id;

	$.ajax({
		url: url,
		type: 'DELETE',
	}).done(function(result) {
		$('#' + id).remove();
		console.log(result);
	}).fail(function(err) {
		console.log('Oh no! Delete request went bad!');
	});
}

function createNewTask() {
	var url = rootURL + 'api/tasks/create';
	// If title is empty, make it undefined so as to auto generate new title
	var title = $('#new-task #title').val();
	var description = $('#new-task #description').val();
	var data = { title: title, date: new Date(Date.now()), time: 40000, description: description};

	$.post(url, data)
		.done(function(tasks) {
			console.log(tasks);
			var createdTask = tasks[tasks.length - 1];
			$('#tasks-list').append(generateTaskHTML(createdTask));
		})
		.fail(function(err) {
			console.log('Oops', err);
		});
}

$(document).ready(function() {
	console.log('ok');
	loadTasks();

	$('#new-task').submit(function(event) {
		event.preventDefault();
		createNewTask();
	});

	$('#tasks-list').on('click', 'button.delete', function() {
		deleteTask($(this).parent().attr('id'));
	});
});

