module.exports = function(id, title, date, time, description) {
	return {
		_id: id,
		title: title,
		date: new Date(date),
		time: time,
		description: description
	};
};