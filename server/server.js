let express = require('express');
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let app = express();

require('./config/env')(process.env);
require('./config/middleware.express')(app);
require('./config/routes.express.js')(app);
require('./config/error.handling.js')(app);

mongoose.connect(process.env.DATABASE_URL)
	.then(function() {
		console.log('Connected to MongoDB database ' + process.env.DATABASE_URL);
	}).catch(function(err) {
		console.log('There was an error connecting to MongoDB', err);
	});

app.listen(process.env.PORT, function() {
	console.log('Listening to Express on  port ' + process.env.PORT + ' in ' + process.env.NODE_ENV + ' mode');
});

module.exports = app;