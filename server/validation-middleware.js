// const check = require('./utility-functions/check');
const ClientError = require('./client-error');

const validateMonth = (req, res, next) => {
  const { monthId } = req.params;
  const num = Number(monthId);

  if (!Number.isInteger(num) || num <= 0) {
    const message = `${monthId} is not a positive non-zero integer at monthId`;
    throw new ClientError(message, 400);
  }

  next();
};

module.exports = validateMonth;
