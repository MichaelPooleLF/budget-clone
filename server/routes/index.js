const getMonth = require('./get-month');
const postGroup = require('./post-group');
const postItem = require('./post-item');
const postTransaction = require('./post-transaction');

module.exports = {
  get: {
    month: getMonth
  },
  post: {
    group: postGroup,
    item: postItem,
    transaction: postTransaction
  }
};
