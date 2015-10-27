var Mongoose = require('mongoose'),
    Budget = require('../../src/models/budgetModel'),
    Const = require('./testConstants');

Mongoose.disconnect();
Mongoose.connect(Const.testDbConnectionString);

module.exports.seed = function (done) {
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

module.exports.cleanup = function(done) {
    //delete budgets
    console.log('Cleaning db...');
    Budget.find().remove(function(err) {
        if (err) {
            throw 'error cloning db:' + err;
        }

        done();
    });
};

