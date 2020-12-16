const { check } = require('../utility-functions');

const validateGroupDelete = (req, res, next) => {
  const { groupId } = req.params;

  check.contains(groupId, 'groupId');
  check.int(groupId);

  next();
};

module.exports = validateGroupDelete;
