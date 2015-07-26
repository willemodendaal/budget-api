var express = require('express'),
    mongoose = require('mongoose'),
    Transaction = require('./models/transactionModel'),
    bodyParser = require('body-parser'),
    TxnRouter = require('./routes/txnRoutes');

var db = mongoose.connect('mongodb://localhost/budget');
var app = express();
var port = process.env.PORT || 3001;

app.use(bodyParser.json()); //Use middleware. Convert json in body to req.body.
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api/transactions', TxnRouter());

app.listen(port, function () {
    console.log('API listening on port ' + port);
});