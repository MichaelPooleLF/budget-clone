const { validateGroupDelete } = require('../middleware');

const deleteGroup = app => {
  app.delete('/api/group/:groupId', validateGroupDelete, (req, res, next) => {
    const { groupId } = req.params;

    res.send(groupId);
  });
};

module.exports = deleteGroup;
