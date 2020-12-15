const check = require('./check');
const create = require('./create');
const format = require('./format');

module.exports = {
  format: { ...format },
  check: { ...check },
  create: { ...create }
};
