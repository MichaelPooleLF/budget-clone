const { check } = require('../utility-functions');

const validateItemPut = (req, res, next) => {
  const { colName, itemId } = req.params;
  const { colVal } = req.body;

  check.contains(colName, 'the column name');
  check.itemTableColName(colName);
  check.contains(colVal, 'the column value');
  switch (colName) {
    case 'itemOrder':
      check.int(colVal);
      break;
    case 'planned':
      check.float(colVal);
      break;
    case 'dueDate':
      if (colVal !== null) check.date(colVal);
      break;
    case 'repeat':
      check.booleanString(colVal);
      break;
    default:
      check.notNullOrUndefined(colVal, colName);
  }
  check.contains(itemId, 'itemId');
  check.int(itemId);

  next();
};

module.exports = validateItemPut;
