const sessionMiddleware = require('./session-middleware');
const staticMiddleware = require('./static-middleware');
const validate = require('./validation-middleware');

module.exports = { sessionMiddleware, staticMiddleware, validate };
