const { validateItemDelete } = require('../middleware');
const { db } = require('../variables');
const { deleteFrom } = require('../sql-queries');
const { check } = require('../utility-functions');

const deleteItem = app => {
  app.delete('/api/item/:itemId', validateItemDelete, (req, res, next) => {
    const { itemId } = req.params;

    db.query(deleteFrom.items, [itemId])
      .then(data => {
        check.id(data);
        res.status(204).json(data);
      })
      .catch(err => next(err));
  });
};

module.exports = deleteItem;
