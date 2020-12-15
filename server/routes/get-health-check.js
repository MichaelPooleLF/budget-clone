const { db } = require('../variables');

const getHealthCheck = app => {
  app.get('/api/health-check', (req, res, next) => {
    db.query('select \'successfully connected\' as "message"')
      .then(result => res.json(result.rows[0]))
      .catch(err => next(err));
  });
};

module.exports = getHealthCheck;
