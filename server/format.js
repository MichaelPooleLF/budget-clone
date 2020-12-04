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
    this.get('groups', 'groupId', data);
    this.getItems(data);
    this.addProp('items').to('groups');
    return this.groups;
  },
  getItems: function (data) {
    this.items = this.uniqueIds(data, 'itemId');
    this.get('items', 'itemId', data);
    this.getSplits(data);
    this.addProp('splits').to('items');
  },
  getSplits: function (data) {
    this.splits = this.uniqueIds(data, 'splitId');
    this.get('splits', 'splitId', data);
    this.getTransactions(data);
    this.addProp('transactions').to('splits');
  },
  getTransactions: function (data) {
    this.transactions = this.uniqueIds(data, 'transactionId');
    this.get('transactions', 'transactionId', data);
    this.addProp('splits').to('transactions');
  },
  addProp: propName => {
    return {
      to: parentName => {
        format[parentName].forEach(parentEl => {
          format[propName].forEach(propEl => {
            format.createOn(parentName, propName, [parentEl, propEl]);
          });
        });
      }
    };
  },
  createOn: function (parentName, propName, elements) {
    let [parentEl, propEl] = elements;
    let idRef = `${parentName}IdRef`;

    if (parentName === 'splits') {
      idRef = `${propName}IdRef`;
      if (propEl.id === parentEl[idRef]) {
        parentEl[propName] = propEl;
      }
    }

    if (parentEl.id === propEl[idRef]) {
      if (!parentEl[propName]) {
        parentEl[propName] = [];
      }

      if (parentName === 'transactions') {
        const { ...propCopy } = propEl;
        propEl = propCopy;
      }

      parentEl[propName].push(propEl);
    }
    // }
  },
  get: function (property, id, data) {
    data.forEach(dataObj => {
      const index = this[property].indexOf(dataObj[id]);
      const inArray = index !== -1;
      if (inArray) {
        this.set[property](index, dataObj, this);
      }
    });
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
    groups: function (index, data, formatObj) {
      formatObj.groups[index] = {
        id: data.groupId,
        name: data.groupName,
        order: data.groupOrder,
        type: data.budgetType
      };
    },
    items: function (index, data, formatObj) {
      formatObj.items[index] = {
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
    splits: function (index, data, formatObj) {
      formatObj.splits[index] = {
        id: data.splitId,
        amount: data.splitAmount,
        itemsIdRef: data.itemIdRef,
        transactionsIdRef: data.transactionIdRef
      };
    },
    transactions: function (index, data, formatObj) {
      formatObj.transactions[index] = {
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
