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

    it('deletes a budget', function(done) {

	    new Promise(function(resolve, reject) {
		        _createBudget('toDelete', new Date(), new Date(), (b) => resolve(b));
	        })
		    .then(function(budget) {
			    //GET the budget, ensure it exists.
			    return new Promise((resolve, reject) => _getBudget(budget._id, (b)=> resolve(b)) );
		    })
		    .then(function(budget) {
			    //Delete the budget.
			    return new Promise((resolve, reject) => _deleteBudget(budget._id, ()=> resolve(budget._id)) );
		    })
		    .then(function(budgetId) {
			    //GET the budget (expected to be null).
			    return new Promise((resolve, reject) => _getBudget(budgetId, (nullBudget)=> resolve(nullBudget)) );
		    })
		    .then(function(nullBudget) {
			    expect(nullBudget).to.be.null;
			    done();
		    })
		    .catch(function(err) {
			    console.log(err);
			    throw err;
		    });


/*
	    _createBudget('toDelete', new Date(), new Date(), function(budget) {
		    var originalId = budget._id;

		    //GET the budget, ensure it exists.
			_getBudget(originalId, function(fetched1) {
				expect(fetched1._id).to.equal(originalId);

				//Delete the budget.
				_deleteBudget(originalId, function() {

					//Try to GET again and expect a 404.
					_getBudget(originalId, function(fetched2) {
						expect(fetched2).to.be.null;
						//done();
					});
				});
			});
	    });
*/
    });

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

	function _getBudget(id, callback) {
		request.get({
				url: Constants.urls.budgetUrl(id),
				json: true
			},
			function (err, res, body) {
				if (err) {
					console.log('Error getting budget: ', err, res, body);
				}

				if (res.statusCode === 404) {
					callback(null);
				}
				else {
					expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					callback(body);
				}
			}
		);
	}

	function _deleteBudget(id, callback) {
		request.del({
				url: Constants.urls.budgetUrl(id)
			},
			function (err, res, body) {
				if (err) {
					console.log('Error deleting budget: ', err, res, body);
				}

				expect(err).to.be.null;
				expect(res.statusCode).to.equal(204); //204 = Deleted
				callback();
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

