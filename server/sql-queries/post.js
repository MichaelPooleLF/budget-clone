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
  transaction: `
    INSERT INTO "transactions" ("transactionName", "transactionDate", "transactionType", "checkNum", "note")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
  `,
  split: 'INSERT INTO "splits" ("transactionIdRef", "itemIdRef", "splitAmount") Values'
};

module.exports = post;
