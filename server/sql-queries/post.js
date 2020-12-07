const post = {
  group: `
    INSERT INTO "budgetGroup" ("groupOrder", "monthId")
      VALUES ($1, $2)
      RETURNING *
  `,
  item: `
    INSERT INTO "budgetItems" ("itemOrder", "groupIdRef", "monthId")
      VALUES ($1, $2, $3)
      RETURNING *
  `,
  transaction: ''
};

module.exports = post;
