var mongoose = require('mongoose'),
    Schema = mongoose.Schema();

var transactionModel = new Schema({
    title: { type: String },
    description: { type: String },
    category: { type: String },
    amount: { type: Number },
    read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Transaction', transactionModel);
