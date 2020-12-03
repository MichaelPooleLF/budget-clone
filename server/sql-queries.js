const request = {
  budget: `
    select *
      FROM "months"
      JOIN "budgetGroup"  using ("monthId")
      JOIN "budgetItems"  using ("monthId")
      JOIN "transactions" using ("monthId")
      JOIN "splits"       using ("monthId")
      WHERE "monthId" = 1
  `,
  groups: `
    select *
      from "budgetGroup"
  `
};

module.exports = request;
