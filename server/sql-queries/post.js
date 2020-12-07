const post = {
  group: `
    INSERT INTO "budgetGroup" ("groupOrder", "monthId")
      VALUES ($1, $2)
      RETURNING *
  `,
  item: `
    INSERT INTO "budgetItems" ("itemOrder", "groupIdRef")
      VALUES ($1, $2)
      RETURNING *
  `,
  transaction: ''
};

module.exports = post;
