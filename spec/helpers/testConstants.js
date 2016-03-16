const rootUrl = 'http://localhost:3034/api';

var urls = {
    budgetsUrl: () => rootUrl + '/budgets',
    putBudgetUrl: (id) => rootUrl + '/budgets/' + id
};

module.exports = {
    urls: urls
};