const { ClientError } = require('../variables');

/*
* if a path on the /api root reaches this middleware without sending a response,
* will send a new ClientError
*/
const handlePathError = app => {
  app.use('/api', (req, res, next) => {
    next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
  });
};

module.exports = handlePathError;
