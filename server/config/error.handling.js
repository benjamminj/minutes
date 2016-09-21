module.exports = function(app) {
	app.use(function(err, req, res, next) {
		if (err.status === 404) {
			res.status(404).json({ name: err.name, message: err.message, status: err.status});
		}
	});
};