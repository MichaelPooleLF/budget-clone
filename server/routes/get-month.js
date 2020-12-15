const { db } = require('../variables');
const { get } = require('../sql-queries');
const { check, format } = require('../utility-functions');
const { validationMiddleware } = require('../middleware');
const { validInt } = validationMiddleware;

// retrieves monthly budget based on monthId
const getMonth = app => {
  app.get('/api/month/:monthId', validInt('month'), (req, res, next) => {
    const { monthId } = req.params;
    db.query(get.month, [monthId])
      .then(data => {
        check.id(data);
        return format.budget(data.rows);
      })
      .then(data => res.status(200).json(data))
      .catch(err => next(err));
  });
};

module.exports = getMonth;
