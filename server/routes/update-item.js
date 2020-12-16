const { validateItemPut } = require('../middleware');
const { db } = require('../variables');
const { update } = require('../sql-queries');
const { check } = require('../utility-functions');

const updateGroup = app => {
  app.put('/api/item/:itemId/:colName', validateItemPut, (req, res, next) => {
    const { colName, itemId } = req.params;
    const { colVal } = req.body;
    const params = [colVal, itemId];

    db.query(update.item.at(colName), params)
      .then(data => {
        check.id(data);
        res.status(200).json(data.rows[0]);
      })
      .catch(err => next(err));
  });
};

module.exports = updateGroup;
