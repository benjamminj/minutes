module.exports = function(env) {
  switch (env.NODE_ENV) {
    case 'production':
      {
        env.DATABASE_URL = env.PROD_DATABASE_URL;
        env.LOG_LEVEL = 'warn';
        env.API_URL = 'http://bjohnson-time-tracker.herokuapp.com/';
        break;
      }
    case 'testing':
      {
        env.DATABASE_URL = 'mongodb://localhost/time-tracker-testing';
        env.PORT = 3000;
        break;
      }
    default:
      {
        env.NODE_ENV = 'development';
        env.DATABASE_URL = 'mongodb://localhost/time-tracker-dev';
        env.PORT = 5000;
        env.LOG_LEVEL = 'info';
        env.API_URL = '//localhost:5000/';
      }
  }
};
