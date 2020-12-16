const deleteFrom = {
  groups: `
    DELETE FROM "budgetGroup"
      WHERE     "groupId" = $1
      RETURNING *
  `
};

module.exports = deleteFrom;
