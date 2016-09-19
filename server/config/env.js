module.exports = function(env) {
	switch (env.NODE_ENV) {
		case 'production': {
			env.DATABASE_URL = 'INSERT PRODUCTION DB URL HERE';
			break;
		}
		case 'testing': {
			env.DATABASE_URL = 'mongodb://localhost/time-tracker-testing';
			env.PORT = 3000;
			break;
		}
		default: {
			env.NODE_ENV = 'development';
			env.DATABASE_URL = 'mongodb://localhost/time-tracker-dev';
			env.PORT = 5000;
		}
	}
};