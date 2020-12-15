const { db } = require('../variables');
const { post } = require('../sql-queries');
const { validationMiddleware: { validInt } } = require('../middleware');

/*
* adds new budgetGroup to a month
* only checks for groupOrder and monthId because groups are created on click with
* default values. user then edits values in update.
*/
const postGroup = app => {
  app.post('/api/group', validInt('group'), (req, res, next) => {
    const { groupOrder, monthId } = req.body;
    const params = [groupOrder, monthId];

    db.query(post.group, params)
      .then(data => res.status(201).json(data.rows[0]))
      .catch(err => next(err));
  });
};

module.exports = postGroup;
