const { validateGroupDelete } = require('../middleware');
const { db } = require('../variables');
const { deleteFrom } = require('../sql-queries');
const { check } = require('../utility-functions');

const deleteGroup = app => {
  app.delete('/api/group/:groupId', validateGroupDelete, (req, res, next) => {
    const { groupId } = req.params;

    db.query(deleteFrom.groups, [groupId])
      .then(data => {
        check.id(data);
        res.status(204).json(data);
      })
      .catch(err => next(err));
  });
};

module.exports = deleteGroup;
