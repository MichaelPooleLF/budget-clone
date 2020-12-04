const format = {
  budget: function (data) {
    const month = {
      [data[0].month]: {
        id: data[0].monthId,
        year: data[0].year,
        groups: this.getGroups(data)
      }
    };

    return month;
  },

  getGroups: function (data) {
    this.groups = this.uniqueIds(data, 'groupId');

    this.create('groups').from(data).using('groupId');
    this.getItems(data);
    this.addProp('items').to('groups');

    return this.groups;
  },

  getItems: function (data) {
    this.items = this.uniqueIds(data, 'itemId');

    this.create('items').from(data).using('itemId');
    this.getSplits(data);
    this.addProp('splits').to('items');
  },

  getSplits: function (data) {
    this.splits = this.uniqueIds(data, 'splitId');

    this.create('splits').from(data).using('splitId');
    this.getTransactions(data);
    this.addProp('transactions').to('splits');
  },

  getTransactions: function (data) {
    this.transactions = this.uniqueIds(data, 'transactionId');

    this.create('transactions').from(data).using('transactionId');
    this.addProp('splits').to('transactions');
  },

  addProp: function (propName) {
    return {

      to: function (parentName) {
        format[parentName].forEach(parentEl => {
          format[propName].forEach(propEl => {
            format.create(propName).on(parentName).using([parentEl, propEl]);
          });
        });
      }
    };
  },

  create: function (propName) {
    return {

      from: function (data) {
        return {

          using: function (id) {
            data.forEach(dataObj => {
              const index = format[propName].indexOf(dataObj[id]);
              const inArray = index !== -1;
              if (inArray) {
                format.set[propName](index, dataObj);
              }
            });
          }
        };
      },

      on: function (parentName) {
        return {

          using: function (elements) {
            let [parentEl, propEl] = elements;
            let idRef = `${parentName}IdRef`;

            if (parentName === 'splits') {
              idRef = `${propName}IdRef`;

              if (propEl.id === parentEl[idRef]) {
                parentEl[propName] = propEl;
              }
            }

            if (parentEl.id === propEl[idRef]) {
              if (parentName === 'transactions') {
                const { ...propCopy } = propEl;
                propEl = propCopy;
              }

              if (!parentEl[propName]) {
                parentEl[propName] = [];
              }

              parentEl[propName].push(propEl);
            }
          }
        };
      }
    };
  },

  uniqueIds: function (data, type) {
    const idSet = new Set();

    data.forEach(dataObj => {
      idSet.add(dataObj[type]);
    });

    const idArr = [...idSet];

    return idArr;
  },

  set: {
    groups: function (index, data) {
      format.groups[index] = {
        id: data.groupId,
        name: data.groupName,
        order: data.groupOrder,
        type: data.budgetType
      };
    },

    items: function (index, data) {
      format.items[index] = {
        id: data.itemId,
        name: data.itemName,
        order: data.itemOrder,
        planned: data.planned,
        spent: data.spent,
        dueDate: data.dueDate,
        repeat: data.repeat,
        groupsIdRef: data.groupIdRef
      };
    },

    splits: function (index, data) {
      format.splits[index] = {
        id: data.splitId,
        amount: data.splitAmount,
        itemsIdRef: data.itemIdRef,
        transactionsIdRef: data.transactionIdRef
      };
    },

    transactions: function (index, data) {
      format.transactions[index] = {
        id: data.transactionId,
        name: data.transactionName,
        type: data.transactionType,
        checkNum: data.checkNum,
        note: data.note,
        date: data.transactionDate,
        deleted: data.deleted
      };
    }
  }
};

module.exports = format;
