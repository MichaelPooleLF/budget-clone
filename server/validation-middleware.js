const check = require('./utility-functions/check');

const validateMonth = (req, res, next) => {
  const { monthId } = req.params;
  const data = {
    val: monthId,
    name: 'monthId'
  };
  check.validMonth(data, next);
};

module.exports = validateMonth;
