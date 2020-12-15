const { check } = require('../utility-functions');

const validate = method => {

  return (req, res, next) => {
    const monthIdParam = req.params.monthId;
    const { groupOrder, monthId } = req.body;
    const { itemOrder, groupIdRef } = req.body;
    const { transactionDate, splits } = req.body;

    switch (method) {
      case 'month':
        check.int(monthIdParam);
        break;
      case 'group':
        check.contains(groupOrder, 'groupOrder');
        check.int(groupOrder);
        check.contains(monthId, 'monthId');
        check.int(monthId);
        break;
      case 'item':
        check.contains(itemOrder, 'itemOrder');
        check.int(itemOrder);
        check.contains(groupIdRef, 'groupIdRef');
        check.int(groupIdRef);
        break;
      case 'transaction':
        check.contains(transactionDate, 'transactionDate');
        check.date(transactionDate);
        check.contains(splits, 'splits');
        for (let i = 0; i < splits.length; i++) {
          check.contains(splits[i].itemIdRef, `splits[${i}].itemIdRef`);
          check.int(splits[i].itemIdRef);
          check.contains(splits[i].splitAmount, `splits[${i}].splitAmount`);
          check.float(splits[i].splitAmount);
        }
        break;
    }

    next();
  };
};
module.exports = validate;
