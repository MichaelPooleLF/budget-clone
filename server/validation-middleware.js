const ClientError = require('./client-error');
const { check } = require('./utility-functions');

const validateMonth = (req, res, next) => {
  const { monthId } = req.params;
  const num = Number(monthId);

  if (!Number.isInteger(num) || num <= 0) {
    const message = `${monthId} is not a positive non-zero integer at monthId`;
    throw new ClientError(message, 400);
  }

  next();
};

const validateInt = method => {

  return (req, res, next) => {
    const { groupOrder, monthId } = req.body;
    const { itemOrder, groupIdRef } = req.body;

    switch (method) {
      case 'group':
        check.int(groupOrder);
        check.int(monthId);
        break;
      case 'item':
        check.int(itemOrder);
        check.int(groupIdRef);
        break;
    }

    next();
  };
};

const validTransactionDate = (req, res, next) => {
  const { transactionDate } = req.body;

  if (!Date.parse(transactionDate)) {
    const message = `${transactionDate} is not a valid date. Valid date format should follow YYYY-MM-DD (from "date")`;
    throw new ClientError(message, 400);
  }

  next();
};

module.exports = { validateMonth, validateInt, validTransactionDate };
