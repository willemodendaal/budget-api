var mongoose = require('mongoose'),
    Budget = require('../src/models/budgetModel');

mongoose.disconnect();
mongoose.connect('mongodb://localhost/budget_test');

describe("Budget repository", function () {
    before(function (done) {
        console.log('Seeding db...');
        _seedDb(done);
    });

    after(function(done) {
        //delete budgets
        console.log('Cleaning db...');
        Budget.find().remove(function(err) {
            if (err) {
                throw 'error clening db:' + err;
            }

            done();
        });

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

    var _seedDb = function (done) {
        var budget = new Budget({
            title: 'test b1',
            dateFrom: '19 may 2005',
            dateTo: '19 may 2005'
        });

        //Create a budget.
        budget.save(function (err, budget) {
            if (err) {
                throw 'Error saving budget: ' + err;
            }

            console.log('Seeded db.');
            done();
        });
    };
});