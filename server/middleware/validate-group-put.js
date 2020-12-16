const { check } = require('../utility-functions');

const validateGroupPut = (req, res, next) => {
  const { colName, groupId } = req.params;
  const { colVal } = req.body;

  check.contains(colName, 'colName');
  check.groupTableColName(colName);
  check.contains(colVal, 'colVal');
  switch (colName) {
    case 'groupOrder':
      check.int(colVal);
      break;
    case 'groupName':
      check.notNullOrUndefined(colVal, colName);
  }
  check.contains(groupId, 'groupId');
  check.int(groupId);

  next();
};

module.exports = validateGroupPut;
