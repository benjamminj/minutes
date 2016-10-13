module.exports = (winston) => {

  winston.level = process.env.LOG_LEVEL;

  winston.add(winston.transports.File, {
    level: 'warn',
    json: false,
    filename: 'logs/errors.log',
    handleExceptions: true,
    humanReadableUnhandledException: true
  });

};
