const sessionMiddleware = require('./session-middleware');
const staticMiddleware = require('./static-middleware');
const validationMiddleware = require('./validation-middleware');

module.exports = { sessionMiddleware, staticMiddleware, validationMiddleware };
