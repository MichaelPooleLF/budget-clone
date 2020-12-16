const { ClientError } = require('../variables');

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

    if (!isNumber || !cents || cents.length !== 2) {
      const message = `${value} is not a valid decimal number. Valid inputs should be greater than zero and formatted as price (ex: '1.00')`;
      throw new ClientError(message, 400);
    }
  },

  contains: (value, property) => {
    if (value !== '' && !value) {
      const message = `${property} is not defined.`;
      throw new ClientError(message, 400);
    }
  },

  date: date => {
    if (!Date.parse(date)) {
      const message = `${date} is not a valid date. Valid date format should follow YYYY-MM-DD`;
      throw new ClientError(message, 400);
    }
  },

  booleanString: string => {
    if (string !== 'true' && string !== 'false') {
      const message = `${string} is not a valid string. Expected 'true' or 'false'.`;
      throw new ClientError(message, 400);
    }
  },

  notNullOrUndefined: (value, property) => {
    if (value === null || value === undefined) {
      const message = `${property} can not be ${value}`;
      throw new ClientError(message, 400);
    }
  },

  groupTableColName: colName => {
    switch (colName) {
      case 'groupOrder':
      case 'groupName':
        break;
      default:
        throw new ClientError(`${colName} is not a column on the budgetGroup table`, 400);
    }
  },

  itemTableColName: colName => {
    switch (colName) {
      case 'itemName':
      case 'repeat':
      case 'itemOrder':
      case 'planned':
      case 'dueDate':
        break;
      default:
        throw new ClientError(`${colName} is not a column on the budgetItem table`, 400);
    }
  }
};

module.exports = check;
