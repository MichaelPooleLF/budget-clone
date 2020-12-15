const { check } = require('../utility-functions');

const validateTransaction = (req, res, next) => {
  const { transactionDate, splits } = req.body;

  check.contains(transactionDate, 'transactionDate');
  check.date(transactionDate);
  check.contains(splits, 'splits');
  for (let i = 0; i < splits.length; i++) {
    check.contains(splits[i].itemIdRef, `splits[${i}].itemIdRef`);
    check.int(splits[i].itemIdRef);
    check.contains(splits[i].splitAmount, `splits[${i}].splitAmount`);
    check.float(splits[i].splitAmount);
  }

  next();
};

module.exports = validateTransaction;
