var mongoose = require('mongoose'),
    Schema = mongoose.Schema();

var transactionModel = new Schema({
    title: { type: String },
    author: { type: String },
    read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Transaction', transactionModel);
