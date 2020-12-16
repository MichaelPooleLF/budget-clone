const { validateGroupPut } = require('../middleware');
const { db } = require('../variables');
const { update } = require('../sql-queries');
const { check } = require('../utility-functions');

const updateGroup = app => {
  app.put('/api/group/:groupId/:colName', validateGroupPut, (req, res, next) => {
    const { colName, groupId } = req.params;
    const { colVal } = req.body;
    const params = [colVal, groupId];

    db.query(update.group.at(colName), params)
      .then(data => {
        check.id(data);
        res.status(200).json(data.rows[0]);
      })
      .catch(err => next(err));
  });
};

module.exports = updateGroup;
