const db = require('../database');
const { check } = require('../utility-functions');
const { post } = require('../sql-queries');

/*
* adds new budgetItem to a group
* only checks for itemOrder and monthId because items are created on click with
* default values. user then edits values in update.
*/
const postItem = app => {
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
};

module.exports = postItem;
