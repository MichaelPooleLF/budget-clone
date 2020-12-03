const request = {
  budget: `
    SELECT  *
  FROM "months"
  JOIN "monthBudgetGroup"       using ("monthId")
  JOIN "budgetGroup" as "g"     using ("budgetGroupId")
  JOIN "budgetGroupItems"       using ("budgetGroupId")
  JOIN "budgetItems" as "i"     using ("budgetItemId")
  JOIN "itemTransactionSplits"  using ("budgetItemId")
  JOIN "transactions"           using ("transactionId")
  JOIN "splits"                 using ("splitId")
  WHERE "monthId" = 1
  `
};

module.exports = request;

// "months"."name" as "month",
//   "year",
//   "g"."name" as "group",
//     "budgetType",
//     "g"."order" as "groupOrder",
//       "i"."name" as "item",
//         "i"."order" as "itemOrder",
//           "amount" as "splitAmount"
