var
    Budget = require('../src/models/budgetModel'),
    Seeder = require('./helpers/testDbSeeder');

describe("Budget repository", function () {
    before(function (done) {
        Seeder.seed(done);
    });

    after(function(done) {
        Seeder.cleanup(done);
    });

    it("has one budget.", function (done) {
        Budget.find(function (err, budgets) {
            if (err) {
                throw 'error finding budget:' + err;
            }

            expect(budgets).to.exist;
            expect(budgets).to.not.be.empty;
            expect(budgets.length).to.equal(1);
            done();
        });
    });

});