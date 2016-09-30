var rootURL = '//localhost:5000/';

var timer = {
	timeInSeconds: 0,
	isRunning: false,
	reset: function() {
		this.timeInSeconds = 0;
		this.isRunning = false;
	},
	start: function(fn) {
		if (!this.isRunning) {
			this.isRunning = true;
			this.intervalID = setInterval(function() {
				this.timeInSeconds += 1;
				fn(this.timeInSeconds);
			}.bind(this), 1000);
		}
	},
	pause: function() {
		this.isRunning = false;
		clearInterval(this.intervalID);
	}, 
	stop: function() {
		this.pause();
		var finalTime = this.timeInSeconds;
		
		this.reset();
		return finalTime;
	}
};

function generateTaskHTML(task) {
	console.log(task);
	return '<div class="task" id="' + task._id + '"><h3>' + task.title + 
		'</h3><button class="edit-title">Edit Title</button><h4>' + task.date + 
		'</h4><h4>' + task.time + '</h4><p>' + task.description + 
		'</p><button class="edit-desc">Edit Description</button><button class="delete">Delete</button></div>';
}

function loadTasks() {
	var url = rootURL + 'tasks/';
	$.getJSON(url)
	.done(function(tasks) {
		if (!tasks.length) {
			// Put some sort of prompt to create something if the user doesn't have anything
			$('#tasks-list').append('<p>It looks like you haven\'t created any tasks yet. Start tracking time today</p>');
		}
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
	var url = rootURL + 'tasks/delete/' + id;

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
	var url = rootURL + 'tasks/create';
	var title = getValue('#new-task #title') || undefined;
	console.log(title);
	var description = getValue('#new-task #description');
	var time = getValue('#new-task #time');
	var data = { title: title, date: new Date(Date.now()), time: time, description: description};

	emptyForm(['#new-task #title', '#new-task #time', '#new-task #description']);
	$.post(url, data)
		.done(function(task) {
			$('#tasks-list').append(generateTaskHTML(task));
		})
		.fail(function(err) {
			console.log(err);
		});
}

function getValue(selector) {
	return $(selector).val();
}

function emptyForm(formElements) {
	formElements.forEach(function(element) {
		$(element).val('');
	});
}

$(document).ready(function() {
	loadTasks();

	$('#new-task').submit(function(event) {
		event.preventDefault();
		createNewTask();
	});

	$('#tasks-list').on('click', 'button.delete', function() {
		deleteTask($(this).parent().attr('id'));
	});

	$('#timer .start').click(function() {
		timer.start(function(currentTime) {
			console.log(currentTime);
		});
	});

	$('#timer .pause').click(function() {
		timer.pause();
	});

	$('#timer .stop').click(function() {
		var seconds = timer.stop();
		console.log(seconds);
	});
});

