let Controller = {};

Controller.getAllTasks = function(req, res, next) {
	res.status(200).json({ message: 'The controller was routed successfully'});
}; 

module.exports = Controller;
