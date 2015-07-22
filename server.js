var express = require('express'),
    mongoose = require('mongoose'),
    Transaction = require('./models/transactionModel');

var db = mongoose.connect('mongodb://localhost/budget');
var app = express();

var port = process.env.PORT || 3001;

var router = express.Router();
router.route('/transactions')
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

app.use('/api', router);

app.get('/', function (req, res) {
    res.send('Aloha.');
});

app.listen(port, function () {
    console.log('App listening on port ' + port);
});