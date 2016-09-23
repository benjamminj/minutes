module.exports = function(name, message, status) {
	let err = new Error(message);
	err.name = name;
	err.status = status;

	return err;
};