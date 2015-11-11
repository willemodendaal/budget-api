var
    Budget = require('../src/models/budgetModel'),
    Seeder = require('./helpers/dbSeederForTests');

describe("Budget seeder", function () {
    before(function (done) {
        Seeder.seed(done);
    });

    after(function(done) {
        Seeder.cleanup(done);
    });

    it("has one budget.", function (done) {
        Seeder.addBudget('budget1').then(function() {

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

});