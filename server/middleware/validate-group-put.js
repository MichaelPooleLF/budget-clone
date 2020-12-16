const { check } = require('../utility-functions');

const validateGroupPut = (req, res, next) => {
  const { groupId } = req.params;
  const { groupOrder, groupName } = req.body;

  check.contains(groupId, 'groupId');
  check.int(groupId);
  check.contains(groupOrder, 'groupOrder');
  check.int(groupOrder);
  check.contains(groupName, 'groupName');

  next();
};

module.exports = validateGroupPut;
