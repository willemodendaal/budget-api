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

    it('updates a budget');
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
                expect(err).to.be.null;
                expect(res.statusCode).to.equal(201); //201 == created
                callback(body);
            }
        );
    }
});

