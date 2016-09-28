$(document).ready(function() {

	$('#login-form').submit(function(event) {
		event.preventDefault();
		var request = { username: $('#username').val(), password: $('#password').val()};
		var url = '//localhost:5000/users/login';
		
		$.post(url, request, function() {
			console.log('Yay!!!');
		})
		.done(function(user) {
			console.log('Another success!', user);
			window.location =  '//localhost:5000/dashboard';
		});

	});
});