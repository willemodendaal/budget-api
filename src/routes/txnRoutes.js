/**
 *
 * REST API to access Transactions.
 * Transactions are always accessed via a parent /budget/:budgetId
 *
 * @class budgetRouter
 * @static
 */

var express = require('express'),
    Budget = require('../models/budgetModel'),
    Transaction = require('../models/transactionModel');


var txnRouter = function () {
    var router = express.Router();

    router.use('budget/:budgetId/transactions/', _injectTxnMiddleware);

    router.route('/budget/:budgetId/transactions/')
        .post(_postTxn)
        .get(_findTxns);

    router.use('budget/:budgetId/transactions/:id', _injectTxnMiddleware);

    router.route('budget/:budgetId/transactions/:id')
        .get(_getTxn)
        .put(_putTxn)
        .patch(_patchTxn)
        .delete(_deleteTxn);

    return router;
};

/**
 * List all transactions.
 * Path: api/budget/:budgetId/transactions/
 *
 * @method GET
 */
function _findTxns(req, res) {
    var query = {
        budget: req.query.budgetId
    };

    if (req.query.category) {
        query.category = req.query.category;
    }

    Transaction.find(query, function (err, txns) {
        if (err) {
            res.status(500).send(err);
        }

        res.json(txns);
    });
}

/**
 * Path: api/budget/:budgetId/transactions/
 *
 * @method POST
 */
function _postTxn(req, res) {
    var txn = new Transaction(req.body);
    txn.budget = req.budget.id;

    txn.save(function(err,txn) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(txn); //Status 201 = Created
        }
    });
}

/**
 * Get a single Transaction.
 * Path: api/budget/:budgetId/transactions/:id
 *
 * @method GET
 */
function _getTxn(req, res) {

    //Txn fetched by middleware, or 404 returned by middleware.

    res.json(req.txn);
}

//Middleware to get Txn by ID, since we do this in more than one
//  route. We append Txn to the request.
function _injectTxnMiddleware(req, res, next) {

    //Find specified budget. Security to be added here to ensure users
    //  only see their own budgets.
    Budget.findById(req.params.budgetId, function(err, budget) {
        if (err) {
            res.status(500).send(err);
        }
        else if (budget && !req.params.id) {
            //Budget found, but no txn id specified.
            req.budget = budget;
            next();
        }
        else if (budget) {
            req.budget = budget;
            //Budget found. Find transaction under budget.
            Transaction.findById(req.params.id, _returnTxn);
        }
        else {
            res.status(404).send('Budget not found.');
        }
    });

    function _returnTxn(err, txn) {
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
    }
}

/**
 * Path: api/budget/:budgetId/transactions/:id
 *
 * @method PUT
 */
function _putTxn(req, res) {
    //Update entire Transaction (all fields).
    req.txn.mapAllFieldsFrom(req.body);

    req.txn.save(function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(req.txn);
        }
    });
}

/**
 * Path: api/budget/:budgetId/transactions/:id
 *
 * @method PATCH
 */
function _patchTxn(req, res) {
    //Update only fields that were passed.
    req.txn.mappPassedFieldsFrom(req.body);

    req.txn.save(function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(req.txn);
        }
    });
}

/**
 * Path: api/budget/:budgetId/transactions/:id
 *
 * @method DELETE
 */

function _deleteTxn(req,res) {

    req.txn.remove(function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            //204 == No-content/Removed
            res.status(204).send('Txn deleted.');
        }
    });
}

module.exports = txnRouter;