require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const { handlePathError, sendError } = require('./middleware');
const { get, post } = require('./routes');

const app = express();

/*
* TOP LEVEL MIDDLEWARE
*/

app.use(staticMiddleware);
app.use(sessionMiddleware);
app.use(express.json());

/*
* GET METHODS
*/

// used to check if server can connect to database
get.healthCheck(app);
// app.get('/api/health-check', (req, res, next) => {
//   db.query('select \'successfully connected\' as "message"')
//     .then(result => res.json(result.rows[0]))
//     .catch(err => next(err));
// });

get.month(app);

/*
* POST METHODS
*/

post.group(app);
post.item(app);
post.transaction(app);

/*
* ERROR HANDLERS
*/

// handles unhandled requests on paths with root "/api"
handlePathError(app);

// versitile error handling middleware
sendError(app);

// start server
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
