let chai = require('chai');
chai.use(require('chai-http'));

let app = require('../../../../server');

describe('Tasks Endpoint', function() {
	
	require('./modules/hooks')();

	describe('Get All Tasks', 
		require('./modules/get.all.tasks.test')(chai, app)
	);

	describe('Delete a Task', 
		require('./modules/delete.task.test')(chai, app)
	);

	describe('Create a New Task', 
		require('./modules/create.task.test')(chai, app)
	);

	describe('Edit a Task', 
		require('./modules/edit.task.test')(chai, app)
	);
});