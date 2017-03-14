
let express = require('express');
let app = express();

const winston = require('winston');

require('./config/env')(process.env);
require('./config/winston.logging')(winston);
require('./config/middleware.express')(app);
require('./config/routes.express.js')(app);

require('./config/mongoose.connection.js')();
require('./config/error.handling.js')(app);

app.listen(process.env.PORT, function() {
  winston.info(`Listening to Express on  port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

module.exports = app;
