const update = {
  group: `
    UPDATE  "budgetGroup"
      SET   "groupOrder"  = $1
            "groupName"   = $2
      WHERE "groupId"     = $3;
  `
};

module.exports = update;
