var express = require('express'),
    mongoose = require('mongoose'), //to access MongoDb
    bodyParser = require('body-parser'),
    Transaction = require('./models/transactionModel'),
    TxnRouter = require('./routes/txnRoutes'),
    BudgetRouter = require('./routes/budgetRoutes');

var dbName = process.env.DB_NAME || 'mongodb://localhost/budget';
var db = mongoose.connect();
var app = express();
var port = process.env.PORT || 3001;

app.use(bodyParser.json()); //Middleware that decodes json bodies.
app.use(bodyParser.urlencoded({extended:true})); //Middleware that decodes form-encoded bodies.
app.use('/doc', express.static('src/out'));
app.use('/api', TxnRouter());
app.use('/api/budgets', BudgetRouter());

app.listen(port, function () {
    console.log('BudgetAPI listening on port ' + port);
});

//Clean-up properly. Close mongoose connection when app stops.
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Closed mongoose connection.');
        process.exit(0);
    });
});


