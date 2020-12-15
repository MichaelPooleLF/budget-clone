const { ClientError } = require('../variables');
const { check } = require('../utility-functions');

const validInt = method => {

  return (req, res, next) => {
    const monthIdParam = req.params.monthId;
    const { groupOrder, monthId } = req.body;
    const { itemOrder, groupIdRef } = req.body;
    const { splits } = req.body;

    switch (method) {
      case 'month':
        check.isValue({ name: 'monthIdParam', value: monthIdParam });
        check.int(monthIdParam);
        break;
      case 'group':
        check.isValue({
          name: 'groupOrder',
          value: groupOrder
        },
        {
          name: 'monthId',
          value: monthId
        });
        check.int(groupOrder);
        check.int(monthId);
        break;
      case 'item':
        check.int(itemOrder);
        check.int(groupIdRef);
        break;
      case 'transaction':
        for (let i = 0; i < splits.length; i++) {
          check.int(splits[i].itemIdRef);
          check.float(splits[i].splitAmount);
        }
        break;
    }

    next();
  };
};

const validDate = (req, res, next) => {
  const { transactionDate } = req.body;

  if (!Date.parse(transactionDate)) {
    const message = `${transactionDate} is not a valid date. Valid date format should follow YYYY-MM-DD`;
    throw new ClientError(message, 400);
  }

  next();
};

// module.exports = { validMonth, validInt, validDate };
module.exports = { validInt, validDate };
