var
    Budget = require('../src/models/budgetModel'),
    Seeder = require('./helpers/testDbSeeder');

describe("Budget model", function () {
    before(function (done) {
        Seeder.seed();

        var b1 = Seeder.addBudget('budget1');
        var b2 = Seeder.addBudget('budget2');
        var b3 = Seeder.addBudget('budget3');

        Promise.all([b1, b2, b3])
            .then(function resolve() {
                done();
            }).catch(function rejected(reason) {
                console.log('Error: ', reason);
            });
    });

    after(function (done) {
        Seeder.cleanup(done);
    });

    it("returns all budgets.", function (done) {
        Budget.find(function(err, results) {
            if (err) {
                throw 'error finding all budgets:' + err;
            }

            expect(results.length).to.equal(3);
            done();
        });
    });


});

