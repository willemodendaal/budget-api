var express = require('express'),
    Transaction = require('../models/transactionModel');


var routes = function () {
    var router = express.Router();
    router.route('/')
        .post(function(req,res) {
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

    router.route('/transactions/:id')
        .get(function (req, res) {
            Transaction.findById(req.params.id, function (err, txn) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(txn);
            });
        });

    return router;

};

module.exports = routes;