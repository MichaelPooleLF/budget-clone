const { check } = require('../utility-functions');

const validateItem = (req, res, next) => {
  const { itemOrder, groupIdRef } = req.body;

  check.contains(itemOrder, 'itemOrder');
  check.int(itemOrder);
  check.contains(groupIdRef, 'groupIdRef');
  check.int(groupIdRef);

  next();
};

module.exports = validateItem;
