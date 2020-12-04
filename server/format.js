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
    this.groups.forEach(group => {
      this.items.forEach(item => {
        // if (group.id === item.groupIdRef) {
        //   if (!group.items) {
        //     group.items = [];
        //   }
        //   group.items.push(item);
        // }
        this.createOn('group', 'items', [group, item]);
      });
    });
    return this.groups;
  },
  getItems: function (data) {
    this.items = this.uniqueIds(data, 'itemId');
    this.get('items', 'itemId', data);
    this.getSplits(data);
    this.items.forEach(item => {
      this.splits.forEach(split => {
      //   if (item.id === split.itemIdRef) {
      //     if (!item.splits) {
      //       item.splits = [];
      //     }
      //     item.splits.push(split);
      //   }
        this.createOn('item', 'splits', [item, split]);
      });
    });
  },
  getSplits: function (data) {
    this.splits = this.uniqueIds(data, 'splitId');
    this.get('splits', 'splitId', data);
    this.getTransactions(data);
    this.transactions.forEach(trans => {
      // console.log(trans);
      this.splits.forEach(split => {
        // if (trans.id === split.transactionIdRef) {
        //   if (!trans.splits) {
        //     trans.splits = [];
        //   }
        //   const { id, amount, itemIdRef, transactionIdRef } = split;
        //   trans.splits.push({ id, amount, itemIdRef, transactionIdRef });
        // }
        this.createOn('transaction', 'splits', [trans, split]);
      });
    });
    this.splits.forEach(split => {
      this.transactions.forEach(trans => {
        // if (trans.id === split.transactionIdRef) {
        //   split.transaction = trans;
        // }
        this.createOn('split', 'transaction', [split, trans]);
      });
    });
  },
  getTransactions: function (data) {
    this.transactions = this.uniqueIds(data, 'transactionId');
    this.get('transactions', 'transactionId', data);
  },
  createOn: function (origin, compare, propObj) {
    const [originObj, compareObj] = propObj;
    let idRef = `${origin}IdRef`;
    if (origin === 'split') {
      idRef = `${compare}IdRef`;
      if (compareObj.id === originObj[idRef]) {
        originObj[compare] = compareObj;
      }
    }
    if (originObj.id === compareObj[idRef]) {
      if (!originObj[compare]) {
        originObj[compare] = [];
      }
      if (origin === 'transaction') {
        const { id, amount, itemIdRef, transactionIdRef } = compareObj;
        originObj[compare].push({ id, amount, itemIdRef, transactionIdRef });
      } else {
        originObj[compare].push(compareObj);
      }
    }
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
        groupIdRef: data.groupIdRef
      };
    },
    splits: function (index, data, formatObj) {
      formatObj.splits[index] = {
        id: data.splitId,
        amount: data.splitAmount,
        itemIdRef: data.itemIdRef,
        transactionIdRef: data.transactionIdRef
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
