const request = {
  budget: `
      select *
        FROM "months"             AS "m"
        FULL JOIN "budgetGroup"   AS "g" on "m"."monthId" = "g"."monthId"
        FULL JOIN "budgetItems"   AS "i" on "g"."groupId" = "i"."groupIdRef"
        FULL JOIN "splits"        AS "s" on "i"."itemId" = "s"."itemIdRef"
        FULL JOIN "transactions"  AS "t" on "t"."transactionId" = "s"."transactionIdRef"
        WHERE "m"."monthId" = 1
        ORDER BY "groupOrder", "itemOrder"
  `
};

module.exports = request;
