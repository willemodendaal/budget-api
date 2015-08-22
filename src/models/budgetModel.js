/**
 *  Provides database access to Budget objects. Exports Budget model.
 *
 * @class Budget
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var budgetSchema = new Schema({
    title: { type: String },
    description: { type: String },
    dateFrom: { type: Date },
    dateTo: { type: Date }
});

/**
 * Map all fields from a Budget object onto this Budget, even
 *  null/empty fields.
 *
 * @method mapAllFieldsFrom
 * @param budget {Budget} The budget to map from onto this instance.
 */
budgetSchema.methods.mapAllFieldsFrom = function(budget) {
    this.title = budget.title;
    this.description = budget.description;
    this.dateFrom = budget.dateFrom;
    this.dateTo = budget.dateTo;
};

/**
 * Map only the fields that were passed from a Budget onto this budget.
 * The _id property will be ignored if passed.
 *
 * @method mapPassedFieldsFrom
 * @param budget {Budget} The budget to map from onto this instance.
 */
budgetSchema.methods.mapPassedFieldsFrom = function(budget) {
    if (budget._id) {
        delete budget._id; //We don't want to update the id.
    }

    //Only update what is passed.
    for(var p in budget) {
        this[p] = budget[p];
    }
};

module.exports = mongoose.model('Budget', budgetSchema);
