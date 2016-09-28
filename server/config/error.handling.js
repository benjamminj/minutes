module.exports = function(app) {
	
	app.use(function(err, req, res, next) {
		if (err.name === 'ValidationError') {
			res.status(400).json({ name: err.name, errors: err.errors });
		} else if (err.name === 'CastError') {
			res.status(400).json({ name: err.name, message: err.message });
		} else {
			next(err);
		}
	});

	app.use(function(err, req, res, next) {
		if (err) {
			res.status(err.status).json({name: err.name, message: err.message});
		}
	});
};