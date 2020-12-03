// const dataEx = data => {
//   const returnThis = {
//     [data[0].month]: {
//       id: data[0].monthId,
//       year: data[0].year,
//       groups: [
//         {
//           id: data[0].groupId,
//           name: data[0].groupName,
//           order: data[0].groupOrder,
//           type: data[0].budgetType,
//           items: [
//             {
//               id: data[0].itemId,
//               name: data[0].itemName,
//               order: data[0].itemOrder,
//               planned: data[0].planned,
//               spent: data[0].spent,
//               dueDate: data[0].dueDate,
//               repeat: data[0].repeat,
//               splits: [
//                 {
//                   id: data[0].splitId,
//                   amount: data[0].splitAmount,
//                   itemIdRef: data[0].itemIdRef,
//                   transactionIdRef: data[0].transactionIdRef,
//                   transaction: {
//                     id: data[0].transactionId,
//                     name: data[0].transactionName,
//                     type: data[0].transactionType,
//                     checkNum: data[0].checkNum,
//                     note: data[0].note,
//                     date: data[0].transactionDate,
//                     deleted: data[0].deleted
//                   }
//                 }
//               ]
//             }
//           ]
//         }
//       ],
//       transactions: [
//         {
//           id: data[0].transactionId,
//           name: data[0].transactionName,
//           type: data[0].transactionType,
//           checkNum: data[0].checkNum,
//           note: data[0].note,
//           date: data[0].transactionDate,
//           deleted: data[0].deleted,
//           splits: [
//             {
//               id: data[0].splitId,
//               amount: data[0].splitAmount,
//               itemIdRef: data[0].itemIdRef,
//               transactionIdRef: data[0].transactionIdRef
//             }
//           ]
//         }
//       ]
//     }
//   };
//   return returnThis;
// };

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
        if (group.id === item.groupIdRef) {
          if (!group.items) {
            group.items = [];
          }
          group.items.push(item);
        }
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
        if (item.id === split.itemIdRef) {
          if (!item.splits) {
            item.splits = [];
          }
          item.splits.push(split);
        }
      });
    });
  },
  getSplits: function (data) {
    this.splits = this.uniqueIds(data, 'splitId');
    this.get('splits', 'splitId', data);
    this.getTransactions(data);
    this.splits.forEach(split => {
      this.transactions.forEach(trans => {
        if (trans.id === split.transactionIdRef) {
          split.transaction = trans;
        }
      });
    });
    this.transactions.forEach(trans => {
      this.splits.forEach(split => {
        if (trans.id === split.transactionIdRef) {
          if (!trans.splits) {
            trans.splits = [];
          }
          const { id, amount, itemIdRef, transactionIdRef } = split;
          trans.splits.push({ id, amount, itemIdRef, transactionIdRef });
        }
      });
    });
  },
  getTransactions: function (data) {
    this.transactions = this.uniqueIds(data, 'transactionId');
    this.get('transactions', 'transactionId', data);
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
  // setGroups: function (index, data) {
  //   this.groups[index] = {
  //     id: data.groupId,
  //     name: data.groupName,
  //     order: data.groupOrder,
  //     type: data.budgetType
  //   };
  // },
  // setItems: function (index, data) {
  //   this.items[index] = {
  //     id: data.itemId,
  //     name: data.itemName,
  //     order: data.itemOrder,
  //     planned: data.planned,
  //     spent: data.spent,
  //     dueDate: data.dueDate,
  //     repeat: data.repeat,
  //     groupIdRef: data.groupIdRef
  //   };
  // },
  // setSplits: function (index, data) {
  //   this.splits[index] = {
  //     id: data.splitId,
  //     amount: data.splitAmount,
  //     itemIdRef: data.itemIdRef,
  //     transactionIdRef: data.transactionIdRef
  //   };
  // },
  // setTrans: function (index, data) {
  //   this.transactions[index] = {
  //     id: data.transactionId,
  //     name: data.transactionName,
  //     type: data.transactionType,
  //     checkNum: data.checkNum,
  //     note: data.note,
  //     date: data.transactionDate,
  //     deleted: data.deleted
  //   };
  // }
};

module.exports = format;

// format.month();
// dataEx([]);
