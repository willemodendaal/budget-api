/**
 *
 * REST API to access Transactions.
 *
 * @class budgetRouter
 * @static
 */

var express = require('express'),
    Transaction = require('../models/transactionModel');


var txnRouter = function () {
    var router = express.Router();
    router.route('/')
        .post(_postTxn)
        .get(_findTxns);

    router.use('/:id', _injectTxnMiddleware);

    router.route('/:id')
        .get(_getTxn)
        .put(_putTxn)
        .patch(_patchTxn)
        .delete(_deleteTxn);

    return router;
};

/**
 * List all transactions.
 * Path: api/transactions/
 *
 * @method GET
 */
function _findTxns(req, res) {
    var query = {};

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
 * Path: api/transactions/
 *
 * @method POST
 */
function _postTxn(req, res) {
    var txn = new Transaction(req.body);

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
 * Path: api/transactions/:id
 *
 * @method GET
 */
function _getTxn(req, res) {
    res.json(req.txn);
}

//Middleware to get Txn by ID, since we do this in more than one
//  route. We append Txn to the request.
function _injectTxnMiddleware(req, res, next) {
    Transaction.findById(req.params.id, function (err, txn) {
        if (err) {
            res.status(500).send(err);
        }
        else if (txn) {
            req.txn = txn;
            next();
        }
        else {
            res.status(404).send('No txn found.');
        }
    });
}

/**
 * Path: api/transactions/:id
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
 * Path: api/transactions/:id
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
 * Path: api/transactions/:id
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