const { db } = require('../variables');
const { post } = require('../sql-queries');
const { validateItem } = require('../middleware');

/*
* adds new budgetItem to a group
* only checks for itemOrder and groupIdRef because items are created on click with
* default values. user then edits values in update.
*/
const postItem = app => {
  app.post('/api/item', validateItem, (req, res, next) => {
    const { itemOrder, groupIdRef } = req.body;
    const params = [itemOrder, groupIdRef];

    db.query(post.item, params)
      .then(data => res.status(201).json(data.rows[0]))
      .catch(err => next(err));
  });
};

module.exports = postItem;
