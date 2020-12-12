const ClientError = require('../client-error');

const check = {
  id: data => {
    if (!data.rows[0]) {
      const message = 'That id does not exist. Please try a different id';
      throw new ClientError(message, 404);
    }
  },

  int: value => {
    const num = Number(value);

    if (!Number.isInteger(num) || num <= 0) {
      const message = `${value} is not a positive non-zero integer.`;
      throw new ClientError(message, 400);
    }
  },

  validInt: (res, value, valueName, i) => {
    const index = (i === 0 || i) ? ` at index ${i}` : '';
    const num = Number(value);

    if (!Number.isInteger(num) || num === 0) {
      res.status(400).json({
        error: `${valueName} should be a positive non-zero integer${index}. Instead, ${valueName} equals "${value}"`
      });

      return false;
    }

    return true;
  },

  invalidInt: (res, value, valueName, i) => {
    const index = (i === 0 || i) ? ` at index ${i}` : '';
    const num = Number(value);

    if (!Number.isInteger(num) || num === 0) {
      res.status(400).json({
        error: `${valueName} should be an positive non-zero integer${index}. Instead, ${valueName} equals "${value}"`
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
    const index = (i === 0 || i) ? ` at index ${i}` : '';
    const cents = value.split('.')[1];
    const isNumber = Number(value);

    if (!isNumber || !cents || cents.length !== 2) {
      res.status(400).json({
        error: `${valueName} '${value}' is not a valid decimal number${index}.  Valid inputs should be greater than zero and formatted as price (ex: '1.00')`
      });
      return true;
    }

    return false;
  },

  idExists: (res, result, value, valueName) => {
    // const id = Number(value);

    if (!result.rows[0]) {
      res.status(404).json({
        error: `${valueName} at id=${value} does not exist. Please try a different id.`
      });
      return false;
    }

    return true;
  }
};

module.exports = check;

// const num = Number(data.val);

// if (!Number.isInteger(num) || num <= 0) {
//   const message = `${}`
//   throw new ClientError()
// }

// return true;
