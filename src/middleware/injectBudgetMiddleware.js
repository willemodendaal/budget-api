var Budget = require('../models/budgetModel');

//Middleware to get Budget by ID, since we do this in more than one
//  route. We append Budget to the request.
var injectBudgetMiddleware = function(req, res, next) {
    Budget.findById(req.params.id, function (err, budget) {
        if (err) {
            res.status(500).send(err);
        }
        else if (budget) {
            req.budget = budget;
            next();
        }
        else {
            res.status(404).send('No budget found.');
        }
    });
};

module.exports = injectBudgetMiddleware;