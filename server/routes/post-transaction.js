const { db } = require('../variables');
const { create } = require('../utility-functions');
const { post } = require('../sql-queries');
const { validateTransaction } = require('../middleware');

// creates a transaction and new splits. splits retrived from array of splits in request body
const postTransaction = app => {
  app.post('/api/transaction', validateTransaction, (req, res, next) => {
    const { transactionName, transactionDate, checkNum, note, splits } = req.body;
    let { transactionType } = req.body;

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
};

module.exports = postTransaction;
