const { check } = require('../utility-functions');

const validateItemDelete = (req, res, next) => {
  const { itemId } = req.params;

  check.contains(itemId, 'itemId');
  check.int(itemId);

  next();
};

module.exports = validateItemDelete;
