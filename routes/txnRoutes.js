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

function _postTxn(req, res) {
    var txn = new Transaction(req.body);

    txn.save();
    res.status(201).send(txn); //Status 201 = Created
}

function _getTxn(req, res) {
    res.json(req.txn);
}

//Middleware to get Txn by ID, since we do this in more than one
//  route. We append Txn to the request.
function _injectTxnMiddleware(req, res, next) {
    Transaction.findById(req.params.id, function (err, txn) {
        if (err)
            res.status(500).send(err);
        else if (txn) {
            req.txn = txn;
            next();
        }
        else {
            res.status(404).send('No txn found.');
        }
    });
}

function _putTxn(req, res) {
    //Find and update entire Transaction.
    req.txn.title = req.body.title;
    req.txn.description = req.body.description;
    req.txn.category = req.body.category;
    req.txn.amount = req.body.amount;
    req.txn.read = req.body.read;

    req.txn.save(function(err) {
        if (err)
            res.status(500).send(err);
        else {
            res.json(req.txn);
        }
    });
}

function _patchTxn(req, res) {
    if (req.body._id) {
        delete req.body._id; //We don't want to update this.
    }

    //Only update what is passed.
    for(var p in req.body) {
        req.txn[p] = req.body[p];
    }

    req.txn.save(function(err) {
        if (err)
            res.status(500).send(err);
        else {
            res.json(req.txn);
        }
    });
}

function _deleteTxn(req,res) {

    req.txn.remove(function(err) {
        if (err)
            res.status(500).send(err);
        else {
            //204 == No-content/Removed
            res.status(204).send('Txn deleted.');
        }
    });
}

module.exports = txnRouter;