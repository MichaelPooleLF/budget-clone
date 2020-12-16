const { validateGroupPut } = require('../middleware');
const { db } = require('../variables');
const { update } = require('../sql-queries');
const { check } = require('../utility-functions');

const updateGroup = app => {
  app.put('/api/group/:groupId', validateGroupPut, (req, res, next) => {
    const { groupId } = req.params;
    const { groupOrder, groupName } = req.body;
    const params = [groupOrder, groupName, groupId];

    db.query(update.group, params)
      .then(data => {
        check.id(data);
        res.status(200).json(data.rows[0]);
      })
      .catch(err => next(err));
  });
};

module.exports = updateGroup;
