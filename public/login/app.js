$(document).ready(function() {
	var rootURL = '//localhost:5000/';

	$('#login-form').submit(function(event) {
		event.preventDefault();
		var request = { username: $('#username').val(), password: $('#password').val()};
		var url = rootURL + 'login';
		
		$.post(url, request, function() {
			console.log('Yay!!!');
		})
		.done(function(user) {
			console.log('Another success!', user);
			window.location = rootURL + 'dashboard';
		});

	});
});