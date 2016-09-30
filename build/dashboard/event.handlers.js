let ajax= require('./ajax');
let generateHTML = require('./html.generator');

module.exports = function() {
	$('#nav-buttons .my-tasks').click(function() {
		$('#timer-container').hide().siblings('#tasks-container').show();
	});

	$('#nav-buttons .new-task').click(function() {
		$('#tasks-container').hide();
		$('#timer-container').show().html(generateHTML.timerHTML());
	});

	$('#tasks-container').on('click', '.task .edit', function(event) {
		let task = $(this).parent();
		let html = generateHTML.editTaskHTML(task);
		$(task).html(html);
	});

	$('#tasks-container').on('click', '.task .save-changes', function() {
		console.log('changes!');
	});

	$('#tasks-container').on('click', '.cancel-changes', function() {
		console.log('cancelled');
		$(task).html()
	});

};