const { check } = require('../utility-functions');

const validateMonth = (req, res, next) => {
  const { monthId } = req.params;

  check.int(monthId);

  next();
};

module.exports = validateMonth;
