const ClientError = require('../client-error');

const check = {
  // checks that the searched id exists in database
  id: data => {
    if (!data.rows[0]) {
      const message = 'That id does not exist. Please try a different id';
      throw new ClientError(message, 404);
    }
  },

  // checks that the value passed in is a valid integer
  int: value => {
    const num = Number(value);

    if (!Number.isInteger(num) || num <= 0) {
      const message = `${value} is not a positive non-zero integer.`;
      throw new ClientError(message, 400);
    }
  },

  // checks that the value passed in is a valid float
  float: value => {
    const cents = value.split('.')[1];
    const isNumber = Number(value);

    if (!isNumber || !cents || !cents.length !== 2) {
      const message = `${value} is not a valid decimal number. Valid inputs should be greater than zero and formatted as price (ex: '1.00')`;
      throw new ClientError(message, 400);
    }
  }
};

module.exports = check;
