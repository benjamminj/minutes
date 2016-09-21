module.exports = function(id, title, date, time, description) {
	let newTask = {
		_id: id,
		title: title,
		date: date,
		time: time,
		description: description
	};

	return newTask;
};