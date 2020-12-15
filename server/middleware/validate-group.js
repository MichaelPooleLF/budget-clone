const { check } = require('../utility-functions');

// checks that req.body has expected properties with valid values
const validateGroup = (req, res, next) => {
  const { groupOrder, monthId } = req.body;

  check.contains(groupOrder, 'groupOrder');
  check.int(groupOrder);
  check.contains(monthId, 'monthId');
  check.int(monthId);

  next();
};

module.exports = validateGroup;
