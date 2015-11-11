var
    Budget = require('../src/models/budgetModel'),
    Seeder = require('./helpers/dbSeederForTests');

describe("Budget api", function () {
    before(function (done) {
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

    it("returns all budgets.", function (done) {

     /*
     *
     *   Launch a mini Express server to test against.
     *   Override node environment variables for port, url, db name etc.
     *
     * */

        throw 'to implement';
    });


});

