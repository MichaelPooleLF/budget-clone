const deleteGroup = app => {
  app.delete('/api/group/:groupId', (req, res, next) => {
    const { groupId } = req.params;

    res.send(groupId);
  });
};

module.exports = deleteGroup;
