const update = {
  group: {
    columnSet: '',

    setCurrentValue(colName) {
      switch (colName) {
        case 'groupOrder':
          this.columnSet = 'SET "groupOrder" = $1';
          break;
        case 'groupName':
          this.columnSet = 'SET "groupName" = $1';
          break;
      }
    },

    at(colName) {
      this.setCurrentValue(colName);

      return `
        UPDATE  "budgetGroup"
          ${this.columnSet}
          WHERE "groupId" = $2
          RETURNING *
      `;
    }
  },

  item: {
    columnSet: '',

    setCurrentValue(colName) {
      switch (colName) {
        case 'itemName':
          this.columnSet = 'SET "itemName" = $1';
          break;
        case 'repeat':
          this.columnSet = 'SET "repeat" = $1';
          break;
        case 'itemOrder':
          this.columnSet = 'SET "itemOrder" = $1';
          break;
        case 'planned':
          this.columnSet = 'SET "planned" = $1';
          break;
        case 'dueDate':
          this.columnSet = 'SET "dueDate" = $1';
          break;
      }
    },

    at(colName) {
      this.setCurrentValue(colName);

      return `
        UPDATE  "budgetItems"
          ${this.columnSet}
          WHERE "itemId" = $2
          RETURNING *
      `;
    }
  }
};

module.exports = update;
