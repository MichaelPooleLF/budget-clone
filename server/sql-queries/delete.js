const deleteFrom = {
  group: `
    DELETE FROM "budgetGroup"
      WHERE     "groupId" = $1
      RETURNING *
  `
};

module.exports = deleteFrom;
