const { check } = require('../utility-functions');

// checks that req.body has valid values
const validateMonth = (req, res, next) => {
  const { monthId } = req.params;

  check.int(monthId);

  next();
};

module.exports = validateMonth;
