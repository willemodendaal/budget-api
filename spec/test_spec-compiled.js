'use strict';

var mongoose = require('mongoose'),
    Budget = require('../src/models/budgetModel');

describe('Budget repository', function () {
    beforeAll(function (done) {
        this.db = mongoose.connect('mongodb://localhost/budget_test');
        _seedDb(done);
        console.log('Seeded db...');
    });

    it('has one budget.', function (done) {
        Budget.find(function (err, budgets) {
            if (err) {
                fail(err);
            }

            expect(budgets).toBe(jasmine.anything());
            done();
        });
    });

    var _seedDb = function _seedDb(done) {
        var budget = new Budget({
            title: 'test b1'
        });

        //Create a budget.
        budget.save(function (err, budget) {
            if (err) {
                fail(err);
            }
            done();
        });
    };
});

//# sourceMappingURL=test_spec-compiled.js.map