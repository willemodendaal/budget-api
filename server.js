var express = require('express'),
    mongoose = require('mongoose'), //to access MongoDb
    Transaction = require('./models/transactionModel'),
    bodyParser = require('body-parser'),
    TxnRouter = require('./routes/txnRoutes');

var db = mongoose.connect('mongodb://localhost/budget');
var app = express();
var port = process.env.PORT || 3001;

app.use(bodyParser.json()); //Middleware that decodes json bodies.
app.use(bodyParser.urlencoded({extended:true})); //Middleware that decodes form-encoded bodies.
app.use('/api/transactions', TxnRouter());

app.listen(port, function () {
    console.log('API listening on port ' + port);
});

//Close mongoose connection when app stops.
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Closed mongoose connection.');
        process.exit(0);
    });
});