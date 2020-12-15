const { ClientError } = require('../variables');

const handlePathError = app => {
  app.use('/api', (req, res, next) => {
    next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
  });
};

module.exports = handlePathError;
