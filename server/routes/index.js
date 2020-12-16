const getHealthCheck = require('./get-health-check');
const getMonth = require('./get-month');
const postGroup = require('./post-group');
const postItem = require('./post-item');
const postTransaction = require('./post-transaction');
const updateGroup = require('./update-group');
const updateItem = require('./update-item');

module.exports = {
  get: {
    month: getMonth,
    healthCheck: getHealthCheck
  },

  post: {
    group: postGroup,
    item: postItem,
    transaction: postTransaction
  },

  update: {
    group: updateGroup,
    item: updateItem
  }
};
