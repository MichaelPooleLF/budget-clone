require('dotenv/config');
const express = require('express');
const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const { request, post } = require('./sql-queries');
const format = require('./format');

const app = express();

function integer(res, value, valueName) {
  if (!Number.isInteger(Number(value))) {
    res.status(400).json({
      error: `${valueName} should be an integer`
    });
    return false;
  }
  return true;
}

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/budget', (req, res, next) => {
  db.query(request.budgetTest)
    .then(data => format.budget(data.rows))
    .then(data => res.status(200).json(data))
    .catch(err => next(err));
});

app.post('/api/groups', (req, res, next) => {
  const { groupOrder, monthId } = req.body;

  // if (!groupName) groupName = 'Untitled';
  if (!integer(res, groupOrder, 'groupOrder')) return;
  if (!integer(res, monthId, 'monthId')) return;

  const params = [groupOrder, monthId];
  db.query(post.group, params)
    .then(data => res.status(201).json(data.rows[0]))
    .catch(err => next(err));
});

// app.post('/api/items', (req, res, next) => {
//   let {itemName, repeat, itemOrder, }
// })

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
