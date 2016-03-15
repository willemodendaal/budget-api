var Budget = require('../src/models/budgetModel'),
	Seeder = require('./helpers/dbSeederForTests'),
	constants = require('./helpers/testConstants'),
	request = require('request');

describe("Budget server", function () {
	var server;
	this.timeout(10000);
	before(function () {
		server = require('../src/server').server;

	});

	after(function (done) {
		Seeder.cleanup(done);
	});

	it("calls server without error.", function (done) {
		request(constants.urls.budgetsUrl(), function (err, resp, body) {
			expect(err).to.be.null;
			console.log('Got a non-error response: ', resp);
			done();
		});
	});
});

