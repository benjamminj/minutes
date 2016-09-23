module.exports = function(app) {
	
	app.use(function(err, req, res, next) {
		if (err.name === 'ValidationError') {
			// console.log('Error middleware -- ', err);
			res.status(400).json({ name: err.name, errors: err.errors });
		} else {
			next(err);
		}
	});

	app.use(function(err, req, res, next) {
		if (err.status === 404) {
			res.status(404).json({ name: err.name, message: err.message});
		} else {
			next(err);
		}
	});

	app.use(function(err, req, res, next) {
		if (err.status === 400) {
			res.status(400).json({name: err.name, message: err.message});
		}
	});
};