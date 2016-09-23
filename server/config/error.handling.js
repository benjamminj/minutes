module.exports = function(app) {
	
	app.use(function(err, req, res, next) {
		if (err.status === 404) {
			res.status(404).json({ name: err.name, message: err.message});
		} else {
			next(err);
		}
	});

	app.use(function(err, req, res, next) {
		if (err.name === 'ValidationError') {
			let keys = err.errors['tasks.2.title'] || 
				err.errors['tasks.2.description'] ||
				err.errors['tasks.2._id'] || 
				err.errors['tasks.2.date'];

			res.status(400).json({ name: err.name, message: keys.message });
		}
	});
};