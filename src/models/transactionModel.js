/**
 *  Provides database access to Transaction objects. Exports Transaction model.
 *
 * @class Transaction
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var transactionSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    category: {type: String, required: true},
    amount: {type: Number, required: true},
    budget: {type: mongoose.Schema.Types.ObjectId, ref: 'Budget', required: true}
});

/**
 * Map all fields from a Transaction onto this Transaction, even
 *  null/empty fields.
 *
 * @method mapAllFieldsFrom
 * @param txn {Transaction} The transaction to map from onto this instance.
 */
transactionSchema.methods.mapAllFieldsFrom = function (txn) {
    this.title = txn.title;
    this.description = txn.description;
    this.category = txn.category;
    this.amount = txn.amount;
    this.budget = txn.budget;
};

/**
 * Map only the fields that were passed from a Transaction onto this transaction.
 * The _id property will be ignored if passed.
 *
 * @method mapPassedFieldsFrom
 * @param txn {Transaction} The transaction to map from onto this instance.
 */
transactionSchema.methods.mapPassedFieldsFrom = function (txn) {
    if (txn._id) {
        delete txn._id; //We don't want to update the id.
    }

    if (txn.budget) {
        delete txn.budget; //Don't allow changing of parent budget, for security reasons.
    }

    //Only update what is passed.
    for (var p in txn) {
        this[p] = txn[p];
    }
};

module.exports = mongoose.model('Transaction', transactionSchema);
