let express = require('express');

let app = express();

require('./config/env')(process.env);
require('./config/middleware.express')(app);

app.listen(process.env.PORT, function() {
	console.log('Listening to Express on  port ' + process.env.PORT + ' in ' + process.env.NODE_ENV + ' mode');
});

module.exports = app;