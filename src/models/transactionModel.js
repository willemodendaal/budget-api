/**
 *  Provides database access to Transaction objects. Exports Transaction model.
 *
 * @module transactionModel
 * @type {Transaction}
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var transactionSchema = new Schema({
    title: { type: String },
    description: { type: String },
    category: { type: String },
    amount: { type: Number },
    read: { type: Boolean, default: false }
});

/**
 * Map all fields from a Transaction onto this Transaction, even
 *  null/empty fields.
 *
 * @method mapAllFieldsFrom
 * @param txn {Transaction} The transaction to map from onto this instance.
 */
transactionSchema.methods.mapAllFieldsFrom = function(txn) {
    this.title = txn.title;
    this.description = txn.description;
    this.category = txn.category;
    this.amount = txn.amount;
    this.read = txn.read;
};

/**
 * Map only the fields that were passed from a Transaction onto this transaction.
 * The _id property will be ignored if passed.
 *
 * @param txn {Transaction} The transaction to map from onto this instance.
 */
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
