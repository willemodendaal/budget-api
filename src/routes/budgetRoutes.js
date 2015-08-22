/**
 *
 * REST API to access Budgets.
 *
 * @class budgetRouter
 * @static
 */

var express = require('express'),
    Budget = require('../models/budgetModel'),
    InjectBudgetMiddleware = require('../middleware/injectBudgetMiddleware');


var budgetRouter = function () {
    var router = express.Router();
    router.route('/')
        .post(_postBudget)
        .get(_findBudgets);

    router.use('/:id', InjectBudgetMiddleware);

    router.route('/:id')
        .get(_getBudget)
        .put(_putBudget)
        .patch(_patchBudget)
        .delete(_deleteBudget);

    return router;
};

/**
 * List all budgets.
 * Path: api/budgets/
 *
 * @method GET
 */
function _findBudgets(req, res) {
    var query = {};

    if (req.query.category) {
        query.category = req.query.category;
    }

    Budget.find(query, function (err, budgets) {
        if (err) {
            res.status(500).send(err);
        }

        res.json(budgets);
    });
}

/**
 * Path: api/budgets/
 *
 * @method POST
 */
function _postBudget(req, res) {
    var budget = new Budget(req.body);

    budget.save(function(err,budget) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(budget); //Status 201 = Created
        }
    });
}

/**
 * Get a single Budget.
 * Path: api/budgets/:id
 *
 * @method GET
 */
function _getBudget(req, res) {
    res.json(req.budget);
}

/**
 * Path: api/budgets/:id
 *
 * @method PUT
 */
function _putBudget(req, res) {
    //Update entire Budget (all fields).
    req.budget.mapAllFieldsFrom(req.body);

    req.budget.save(function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(req.budget);
        }
    });
}

/**
 * Path: api/budgets/:id
 *
 * @method PATCH
 */
function _patchBudget(req, res) {
    //Update only fields that were passed.
    req.budget.mappPassedFieldsFrom(req.body);

    req.budget.save(function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(req.budget);
        }
    });
}

/**
 * Path: api/budgets/:id
 *
 * @method DELETE
 */

function _deleteBudget(req,res) {

    req.budget.remove(function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            //204 == No-content/Removed
            res.status(204).send('Budget deleted.');
        }
    });
}

module.exports = budgetRouter;