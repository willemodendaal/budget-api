var express = require('express'),
    Transaction = require('../models/transactionModel');

var routes = function () {
    var router = express.Router();
    router.route('/')
        .post(function (req, res) {
            var txn = new Transaction(req.body);

            txn.save();
            res.status(201).send(txn); //Status 201 = Created

        })
        .get(function (req, res) {

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

        });

    router.route('/:id')
        .get(function (req, res) {
            Transaction.findById(req.params.id, function (err, txn) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(txn);
            });
        })
        .put(function (req, res) {
            //Find and update entire Transaction.
            Transaction.findById(req.params.id, function(err, txn) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    txn.title = req.body.title;
                    txn.description = req.body.description;
                    txn.category = req.body.category;
                    txn.amount = req.body.amount;
                    txn.read = req.body.read;

                    txn.save();
                    res.status(200).send(txn);
                }

            });
        });

    return router;

};

module.exports = routes;