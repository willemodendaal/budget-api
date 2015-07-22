var express = require('express'),
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/budget');
var app = express();
var Transaction = require('./models/transactionModel');

var port = process.env.PORT || 3001;

var router = express.Router();
router.route('/transactions')
    .get(function(req, res) {
        Transaction.find(function(err, txns) {
            if (err) {
                console.log(err);
            }

            res.json(txns);
        });
    });

app.use('/api', router);

app.get('/', function(req, res) {
    res.send('Aloha.');
});

app.listen(port, function() {
    console.log('App listening on port ' + port);
});