require('dotenv/config');
const express = require('express');
const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const { post } = require('./sql-queries');
const { check, create } = require('./utility-functions');
const { getMonth, postGroup } = require('./routes');

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
app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

getMonth(app);

/*
* POST METHODS
*/

postGroup(app);

/*
* adds new budgetItem to a group
* only checks for itemOrder and monthId because items are created on click with
* default values. user then edits values in update.
*/
app.post('/api/item', (req, res, next) => {
  const { itemOrder, groupIdRef } = req.body;

  // checks for invalid entries in request body
  if (check.invalidInt(res, itemOrder, 'itemOrder')) return;
  if (check.invalidInt(res, groupIdRef, 'groupIdRef')) return;

  const params = [itemOrder, groupIdRef];
  db.query(post.item, params)
    .then(data => res.status(201).json(data.rows[0]))
    .catch(err => next(err));
});

// creates a transaction and new splits. splits retrived from array of splits in request body
app.post('/api/transaction', (req, res, next) => {
  let { transactionName, transactionDate, transactionType, checkNum, note } = req.body;
  const { splits } = req.body;

  // checks for invalid entries in request body
  if (check.invalidDate(res, transactionDate)) return;
  for (let i = 0; i < splits.length; i++) {
    if (check.invalidInt(res, splits[i].itemIdRef, 'itemIdRef', i)) return;
    if (check.invalidFloat(res, splits[i].splitAmount, 'splitAmount', i)) return;
  }
  if (!transactionType) transactionType = 'expense';

  const transParams = [transactionName, transactionDate, transactionType, checkNum, note];

  // adds transaction, then generates insert query based on number of splits
  db.query(post.transaction, transParams)
    .then(data => {
      const { transactionId } = data.rows[0];
      const splitParams = create.splitParams(splits, transactionId);
      const splitQuery = create.splitQuery(splits);

      return db.query(splitQuery, splitParams)
        .then(result => res.status(200).json(result.rows));
    })
    .catch(err => next(err));
});

/*
* ERROR HANDLERS
*/

// handles unhandled requests on paths with root "/api"
app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

// versitile error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({
      error: err.message
    });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
