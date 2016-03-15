"use strict";

var Mongoose = require('mongoose'),
    Budget = require('../../src/models/budgetModel'),
    Const = require('./testConstants');

Mongoose.disconnect();

console.log('Connecting to database: ' + process.env.DB_NAME);
Mongoose.connect('mongodb://localhost/'+ process.env.DB_NAME);

var budgetsAdded = [];

module.exports.seed = function (done) {
    //Any initial setup, like test User creation.
    if (done) {
        done();
    }
};

module.exports.cleanup = function(done) {
    //delete All budgets.
    console.log('Cleaning db...');
    Budget.find().remove(function(err) {
        if (err) {
            throw 'error cleaning db:' + err;
        }

        done();
    });
};

module.exports.addBudget = function(name) {
    console.log('Adding budget with name: ' + name);

    return new Promise(function pr(resolve, reject) {
        var budget = new Budget({
            title: name,
            dateFrom: '19 may 2005',
            dateTo: '19 may 2005'
        });

        budget.save(function (err, resultBudget) {
            if (err) {
                reject('Error adding budget: ' + err);
            }

            budgetsAdded.push(resultBudget);
            resolve(resultBudget);
        });
    });
};
