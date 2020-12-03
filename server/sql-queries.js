const request = {
  budget: `
    select *
      FROM "months"
      JOIN "budgetGroup"  using ("monthId")
      JOIN "budgetItems"  using ("monthId")
      JOIN "transactions" using ("monthId")
      JOIN "splits"       using ("monthId")
      WHERE "monthId" = 1
  `
};

module.exports = request;

// SELECT *
//   FROM  "months"
// JOIN  "budgetGroup"  using("monthId")
// JOIN  "budgetItems"  using("budgetGroupId")
// JOIN  "transactions" using("budgetItemId")
// JOIN  "splits"       using("budgetItemId")
// WHERE "monthId" = 1
