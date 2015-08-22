var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var transactionSchema = new Schema({
    title: { type: String },
    description: { type: String },
    category: { type: String },
    amount: { type: Number },
    read: { type: Boolean, default: false }
});

transactionSchema.methods.mapAllFieldsFrom = function(txn) {
    this.title = txn.title;
    this.description = txn.description;
    this.category = txn.category;
    this.amount = txn.amount;
    this.read = txn.read;
};

transactionSchema.methods.mapPassedFieldsFrom = function(txn) {
    if (txn._id) {
        delete txn._id; //We don't want to update the id.
    }

    //Only update what is passed.
    for(var p in txn) {
        this[p] = txn[p];
    }
};


module.exports = mongoose.model('Transaction', transactionSchema);
