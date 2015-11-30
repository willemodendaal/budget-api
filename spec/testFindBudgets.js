var
    Budget = require('../src/models/budgetModel'),
    Seeder = require('./helpers/dbSeederForTests'),
    constants = require('./helpers/testConstants'),
    http = require('http');

describe("Budget api", function () {
    var server;
    this.timeout(10000);
    before(function (done) {
        console.log('Hosting test server...');
        server = require('../src/server').server;

        Seeder.seed();
        var b1 = Seeder.addBudget('budget1');
        var b2 = Seeder.addBudget('budget2');
        var b3 = Seeder.addBudget('budget3');

        Promise.all([b1, b2, b3])
            .then(function resolve() {
                done();
            }).catch(function rejected(reason) {
            throw 'Error: ' + reason;
        });
    });

    after(function (done) {
        server.close();
        Seeder.cleanup(done);
    });

    it("returns all budgets.", function (done) {
        var req = http.request(constants.urls.getBudgetsUrl(), function (resp) {
            done();
        });

        req.on('error', function (err) {
            throw 'error connecting to service:' + err;
        });

        req.end();
    });

});

