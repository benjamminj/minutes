let chai = require('chai');

let should = chai.should();

describe('Task Schema', function() {
	describe('joiValidate Method', function() {
		it('Valid object should return true boolean', function(done) {
			let goodObj = {
				title: 'My Super Awesome Task',
				date: new Date(2016-09-19),
				time: 4000 * 5,
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, laboriosam.'
			};

			let validation = taskSchema.methods.joiValidate(goodObj);

			validation.should.equal(true);
		});
	});
});