const db = require('../database');
const { post } = require('../sql-queries');
const { validateInt } = require('../validation-middleware');

/*
* adds new budgetItem to a group
* only checks for itemOrder and monthId because items are created on click with
* default values. user then edits values in update.
*/
const postItem = app => {
  app.post('/api/item', validateInt('item'), (req, res, next) => {
    const { itemOrder, groupIdRef } = req.body;

    const params = [itemOrder, groupIdRef];
    db.query(post.item, params)
      .then(data => res.status(201).json(data.rows[0]))
      .catch(err => next(err));
  });
};

module.exports = postItem;
