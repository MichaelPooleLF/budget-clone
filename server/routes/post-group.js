const { check } = require('../utility-functions');
const db = require('../database');
const { post } = require('../sql-queries');

function postGroup(app) {
  app.post('/api/group', (req, res, next) => {
    const { groupOrder, monthId } = req.body;

    // checks for invalid entries in request body
    if (check.invalidInt(res, groupOrder, 'groupOrder')) return;
    if (check.invalidInt(res, monthId, 'monthId')) return;

    const params = [groupOrder, monthId];
    db.query(post.group, params)
      .then(data => res.status(201).json(data.rows[0]))
      .catch(err => next(err));
  });
}

module.exports = postGroup;
