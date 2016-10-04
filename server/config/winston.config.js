module.exports = (winston) => {

  winston.level = process.env.LOG_LEVEL;

  winston.add(winston.transports.File, {
    level: 'warn',
    filename: 'logs/errors.log',
    json: true,
    handleExceptions: true,
    humanReadableUnhandledException: true
  });

};