const check = {
  invalidInt: (res, value, valueName, i) => {
    const index = (i === 0 || i) ? ` at index ${i}` : '';

    if (!Number.isInteger(Number(value))) {
      res.status(400).json({
        error: `${valueName} should be an integer${index}. Instead, ${valueName} equals "${value}"`
      });

      return true;
    }

    return false;
  },

  invalidDate: (res, date) => {
    if (!Date.parse(date)) {
      res.status(400).json({
        error: `${date} is not a valid date. Valid date format should follow YYYY-MM-DD`
      });
      return true;
    }
    return false;
  },

  invalidFloat: (res, value, valueName, i) => {
    const index = (i === 0 || i) ? `at index ${i}` : '';
    const cents = value.split('.')[1];
    const isNumber = Number(value);

    if (!isNumber || !cents || cents.length !== 2) {
      res.status(400).json({
        error: `${valueName} '${value}' is not a valid decimal number${index}.  Valid inputs should be greater than zero and formatted as price (ex: '1.00')`
      });
      return true;
    }

    return false;
  }
};

module.exports = check;
