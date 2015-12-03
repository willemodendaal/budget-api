var
    Budget = require('../src/models/budgetModel'),
    Seeder = require('./helpers/dbSeederForTests'),
    constants = require('./helpers/testConstants'),
    request = require('request');

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
        Seeder.cleanup(done);
    });

    it("returns all budgets with correct titles.", function (done) {
        request(constants.urls.budgetsUrl(), function (err, resp, body) {
            expect(err).to.be.null;

            var json = JSON.parse(body);
            expect(json.length).to.equal(3);
            expect(json[0].title).to.equal('budget1');
            expect(json[1].title).to.equal('budget2');
            expect(json[2].title).to.equal('budget3');

            done();

        });
    });
});

