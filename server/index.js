require('dotenv/config');
const express = require('express');
const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const { request, post } = require('./sql-queries');
const { check, create } = require('./utility-functions');
const format = require('./format');

const app = express();

// function invalidInt(res, value, valueName, i) {
//   const index = (i === 0 || i) ? ` at index ${i}` : '';

//   if (!Number.isInteger(Number(value))) {
//     res.status(400).json({
//       error: `${valueName} should be an integer${index}. Instead, ${valueName} equals "${value}"`
//     });
//     return true;
//   }
//   return false;
// }

// function invalidDate(res, date) {
//   if (!Date.parse(date)) {
//     res.status(400).json({
//       error: `${date} is not a valid date. Valid date format should follow YYYY-MM-DD`
//     });
//     return true;
//   }
//   return false;
// }

// function invalidFloat(res, value, valueName, i) {
//   const index = (i === 0 || i) ? `at index ${i}` : '';
//   const cents = value.split('.')[1];
//   const isNumber = Number(value);

//   if (!isNumber || !cents || cents.length !== 2) {
//     res.status(400).json({
//       error: `${valueName} '${value}' is not a valid decimal number${index}.  Valid inputs should be greater than zero and formatted as price (ex: '1.00')`
//     });
//     return true;
//   }

//   return false;
// }

// function createSplitQuery(arr) {
//   let counter = 1;
//   let query = post.split;

//   for (let i = 0; i < arr.length; i++) {
//     let newValueSet = '';

//     if (i === arr.length - 1) {
//       newValueSet = ` ($${counter++}, $${counter++}, $${counter++}) RETURNING *;`;
//     } else {
//       newValueSet = ` ($${counter++}, $${counter++}, $${counter++}),`;
//     }
//     query += newValueSet;
//   }

//   return query;
// }

// function createSplitParams(arr, transactionId) {
//   const params = [];

//   arr.forEach(split => {
//     params.push(transactionId, split.itemIdRef, split.splitAmount);
//   });

//   return params;
// }

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/budget', (req, res, next) => {
  db.query(request.budget)
    .then(data => format.budget(data.rows))
    .then(data => res.status(200).json(data))
    .catch(err => next(err));
});

// only check for groupOrder and monthId because groups are created on click with
// default values. user then edits values in update.
app.post('/api/group', (req, res, next) => {
  const { groupOrder, monthId } = req.body;

  if (check.invalidInt(res, groupOrder, 'groupOrder')) return;
  if (check.invalidInt(res, monthId, 'monthId')) return;

  const params = [groupOrder, monthId];
  db.query(post.group, params)
    .then(data => res.status(201).json(data.rows[0]))
    .catch(err => next(err));
});

// only check for itemOrder and monthId because items are created on click with
// default values. user then edits values in update.
app.post('/api/item', (req, res, next) => {
  const { itemOrder, groupIdRef } = req.body;

  if (check.invalidInt(res, itemOrder, 'itemOrder')) return;
  if (check.invalidInt(res, groupIdRef, 'groupIdRef')) return;

  const params = [itemOrder, groupIdRef];
  db.query(post.item, params)
    .then(data => res.status(201).json(data.rows[0]))
    .catch(err => next(err));
});

app.post('/api/transaction', (req, res, next) => {
  let { transactionName, transactionDate, transactionType, checkNum, note } = req.body;
  const { splits } = req.body;

  if (check.invalidDate(res, transactionDate)) return;
  for (let i = 0; i < splits.length; i++) {
    if (check.invalidInt(res, splits[i].itemIdRef, 'itemIdRef', i)) return;
    if (check.invalidFloat(res, splits[i].splitAmount, 'splitAmount', i)) return;
  }
  if (!transactionType) transactionType = 'expense';

  const transParams = [transactionName, transactionDate, transactionType, checkNum, note];

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

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

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
