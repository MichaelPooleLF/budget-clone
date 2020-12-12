const validateMonth = require('../validation-middleware');
const db = require('../database');
const format = require('../format');
const { get } = require('../sql-queries');
const check = require('../utility-functions/check');

function getMonth(app) {
  app.get('/api/month/:monthId', validateMonth, (req, res, next) => {
    const { monthId } = req.params;
    db.query(get.month, [monthId])
      .then(data => {
        check.id(data);
        return format.budget(data.rows);
      })
      .then(data => res.status(200).json(data))
      .catch(err => next(err));
  });
}

module.exports = getMonth;
