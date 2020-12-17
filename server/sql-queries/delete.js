const deleteFrom = {
  groups: `
    DELETE FROM "budgetGroup"
      WHERE     "groupId" = $1
      RETURNING *
  `,
  items: `
    DELETE FROM "budgetItems"
      WHERE     "itemId" = $1
      RETURNING *
  `
};

module.exports = deleteFrom;
