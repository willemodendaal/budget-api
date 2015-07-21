var express = require('express');

var app = express();

var port = process.env.PORT || 3001;

app.get('/', function(req, res) {
    res.send('Aloha.');
});

app.listen(port, function() {
    console.log('App listening on port ' + port);
});