/**
 * Middleware used to extract `id` from /budgets/:budgetId/:id path and populate request with `budget` and `transaction` objects.
 *
 * @class InjectTxnMiddleware
 * @static
 */

var Budget = require('../models/budgetModel'),
    Transaction = require('../models/transactionModel');

var InjectTxnMiddleware = function(req, res, next) {

    //Find specified budget. Security to be added here to ensure users
    //  only see their own budgets.
    Budget.findById(req.params.budgetId, function(err, budget) {
        if (err) {
            res.status(500).send(err);
        }
        else if (budget && !req.params.id) {
            //Budget found, but no txn id specified. Only set budget
            //  and continue.
            req.budget = budget;
            next();
        }
        else if (budget && req.params.id) {
            //Budget found. Find Transaction under budget and continue.
            req.budget = budget;
            _findTxn(req, res);
        }
        else {
            res.status(404).send('Budget not found.');
        }
    });
};


function _findTxn(req, res) {
    Transaction.findById(req.params.id, function(err,txn) {
        if (err) {
            res.status(500).send(err);
        }
        else if (txn) {
            req.txn = txn;
            next();
        }
        else {
            res.status(404).send('Txn not found.');
        }
    });
}

module.exports = InjectTxnMiddleware;