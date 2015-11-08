var
    Budget = require('../src/models/budgetModel'),
    Seeder = require('./helpers/testDbSeeder');

describe("Budget model", function () {
    before(function (done) {
        Seeder.seed(()=>{});

        var b1 = _addBudget('budget1');
        var b2 = _addBudget('budget2');
        var b3 = _addBudget('budget3');

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
        throw 'Not implemented yet.';
    });

    function _addBudget(name) {
        console.log('Adding budget with name: ' + name);

        return new Promise(function pr(resolve, reject) {
            var budget = new Budget({
                title: name,
                dateFrom: '19 may 2005',
                dateTo: '19 may 2005'
            });

            budget.save(function (err, budget) {
                if (err) {
                    reject('Error adding budget: ' + err);
                }

                resolve(budget);
            });
        });
    }
});

