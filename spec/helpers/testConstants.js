const rootUrl = 'http://localhost:3034/api';

var urls = {
    budgetsUrl: () => rootUrl + '/budgets',
    budgetUrl: (id) => rootUrl + '/budgets/' + id
};

module.exports = {
    urls: urls
};