var Budget = require('../src/models/budgetModel'),
    Seeder = require('./helpers/dbSeederForTests'),
    Constants = require('./helpers/testConstants'),
    request = require('request');

describe("Budget api crud methods", function () {
    var server;
    this.timeout(10000);
    before(function (done) {
        server = require('../src/server').server;
        Seeder.seed(done);
    });

    after(function (done) {
        Seeder.cleanup(done);
    });

    it('creates a budget', function (done) {
        var dateFrom = new Date();
        var dateTo = new Date();

        _createBudget(
            'create budget test',
            dateFrom,
            dateTo,
            function (newBudget) {
                expect(newBudget.title).to.equal('create budget test');
                //expect(newBudget.dateFrom).to.equal(new Date(dateFrom));
                //expect(newBudget.dateTo).to.equal(new Date(dateTo));
                expect(newBudget._id).to.be.ok;
                done();
            }
        );
    });

    it('updates(puts) a budget', function(done) {
        _createBudget('toPut', new Date(), new Date(), function(budget) {
	        var id = budget._id;
	        budget.title = 'toPutUpdated';

	        _putBudget(id, budget, function(updated) {
		        expect(updated.title).to.equal('toPutUpdated');
		        done();
	        });
        });
    });

	it('updates(patches) a budget', function(done) {
		_createBudget('toPatch', new Date(), new Date(), function(budget) {
			var id = budget._id;
			budget.description = 'patched';

			_patchBudget(id, budget, function(updated) {
				expect(updated.title).to.equal('toPatch');
				expect(updated.description).to.equal('patched');
				done();
			});
		});
	});

    it('deletes a budget');
    it('gets a budget');

    function _createBudget(name, dateFrom, dateTo, callback) {
        request.post({
                url: Constants.urls.budgetsUrl(),
                json: true,
                body: {
                    title: name,
                    dateFrom: dateFrom,
                    dateTo: dateTo
                }
            },
            function (err, res, body) {
	            if (err) {
		            console.log('Error creating: ', err, res, body);
	            }
                expect(err).to.be.null;
                expect(res.statusCode).to.equal(201); //201 == created
                callback(body);
            }
        );
    }

	function _putBudget(id, budget, callback) {
		request.put({
				url: Constants.urls.budgetUrl(id),
				json: true,
				body: budget
			},
			function (err, res, body) {
				if (err) {
					console.log('Error putting: ', err, res, body);
				}

				expect(err).to.be.null;
				expect(res.statusCode).to.equal(200);
				callback(body);
			}
		);
	}


	function _patchBudget(id, budget, callback) {
		request.patch({
				url: Constants.urls.budgetUrl(id),
				json: true,
				body: budget
			},
			function (err, res, body) {
				if (err) {
					console.log('Error patching: ', err, res, body);
				}

				expect(err).to.be.null;
				expect(res.statusCode).to.equal(200);
				callback(body);
			}
		);
	}
});

