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

        _createBudget('create budget test', dateFrom, dateTo)
	        .then(function (newBudget) {
                expect(newBudget.title).to.equal('create budget test');
                expect(newBudget._id).to.be.ok;
                done();
            }
        );
    });

    it('updates(puts) a budget', function(done) {
        _createBudget('toPut', new Date(), new Date())
	        .then(function(budget) {
		        var id = budget._id;
		        budget.title = 'toPutUpdated';

		        _putBudget(id, budget)
			        .then(function(updated) {
				        expect(updated.title).to.equal('toPutUpdated');
				        done();
		            });
            });
    });

	it('updates(patches) a budget', function(done) {
		_createBudget('toPatch', new Date(), new Date())
			.then(function(budget) {
				var id = budget._id;
				budget.description = 'patched';

				_patchBudget(id, budget)
					.then(function(updated) {
						expect(updated.title).to.equal('toPatch');
						expect(updated.description).to.equal('patched');
						done();
					});
			});
	});

    it('deletes a budget', function(done) {
	    _createBudget('toDelete', new Date(), new Date())
		    .then(function(budget) {
			    //GET the budget, ensure it exists.
			    return _getBudget(budget._id);
		    })
		    .then(function(budget) {
			    //Delete the budget.
			    return _deleteBudget(budget._id);
		    })
		    .then(function(budgetId) {
			    //GET the budget (expected to be null).
			    return _getBudget(budgetId);
		    })
		    .then(function(nullBudget) {
			    expect(nullBudget).to.be.null;
			    done();
		    })
		    .catch(function(err) {
			    console.log(err);
			    throw err;
		    });
    });

	function _createBudget(name, dateFrom, dateTo) {
		return new Promise((resolve, reject) => {
			request.post({
					url: Constants.urls.budgetsUrl(),
					json: true,
					body: {
						title: name,
						dateFrom: dateFrom,
						dateTo: dateTo
					}
				},
				function (err, result, body) {
					if (err) {
						console.log('Error creating: ', err, result, body);
						reject(err);
					}
					expect(err).to.be.null;
					expect(result.statusCode).to.equal(201); //201 == created
					resolve(body);
				}
			);
		});
	}

	function _putBudget(id, budget) {
		return new Promise((resolve, reject) =>
			request.put({
					url: Constants.urls.budgetUrl(id),
					json: true,
					body: budget
				},
				function (err, res, body) {
					if (err) {
						console.log('Error putting: ', err, res, body);
						reject(err);
					}

					expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					resolve(body);
				}
			));
	}

	function _getBudget(id) {
		return new Promise((resolve, reject) =>
			request.get({
					url: Constants.urls.budgetUrl(id),
					json: true
				},
				function (err, res, body) {
					if (err) {
						console.log('Error getting budget: ', err, res, body);
						reject(err);
					}

					if (res.statusCode === 404) {
						resolve(null);
					}
					else {
						expect(err).to.be.null;
						expect(res.statusCode).to.equal(200);
						resolve(body);
					}
				}
		));
	}

	function _deleteBudget(id) {
		return new Promise((resolve, reject) =>
			request.del({
					url: Constants.urls.budgetUrl(id)
				},
				function (err, res, body) {
					if (err) {
						console.log('Error deleting budget: ', err, res, body);
						reject(err);
					}

					expect(err).to.be.null;
					expect(res.statusCode).to.equal(204); //204 = Deleted
					resolve(id);
				}
			));
	}

	function _patchBudget(id, budget) {
		return new Promise((resolve, reject) =>
			request.patch({
					url: Constants.urls.budgetUrl(id),
					json: true,
					body: budget
				},
				function (err, res, body) {
					if (err) {
						console.log('Error patching: ', err, res, body);
						reject(err);
					}

					expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					resolve(body);
				}
			));
	}
});

