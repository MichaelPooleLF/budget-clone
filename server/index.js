require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const { handlePathError, sendError } = require('./middleware');
const { get, post } = require('./routes');

const app = express();

// TOP LEVEL MIDDLEWARE
app.use(staticMiddleware); // serves static files in the public path
app.use(sessionMiddleware); // stores session data in session file
app.use(express.json()); // parses request bodies as JSON

// GET METHODS
get.healthCheck(app); // check if server can connect to database
get.month(app); // retrieve budget by monthId

// POST METHODS
post.group(app); // add a new group
post.item(app); // add a new group item
post.transaction(app); // add a new transaction

// ERROR HANDLERS
handlePathError(app); // handles unhandled requests on paths with root "/api"
sendError(app); // versitile error handling middleware

// START SERVER
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
