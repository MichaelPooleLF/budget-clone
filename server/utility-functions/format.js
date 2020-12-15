
const format = {
  groups: {},
  splitStore: {},
  transactionStore: {},

  budget: data => {
    format.populateGroups(data);
    const { groups } = format;
    const month = {
      [data[0].monthId]: {
        month: data[0].month,
        year: data[0].year,
        groups
      }
    };
    return month;
  },

  populateGroups: data => {
    data.forEach(dataObj => {
      const set = format.set(dataObj);
      const { groupId, itemId, splitId, transactionId } = dataObj;
      const { groups, splitStore, transactionStore } = format;

      set.group(groups, groupId);

      if (itemId) {
        const groupItems = groups[groupId].items;
        set.item(groupItems, itemId);

        const itemSplits = groupItems[itemId].splits;
        set.splitStore(splitStore, splitId);
        set.split(itemSplits, splitId);

        const splitTransaction = itemSplits[splitId].transaction;
        set.transactionStore(transactionStore, transactionId, splitId);
        set.splitTransaction(splitTransaction, transactionId);
      }
    });
  },

  set: dataObj => {

    return {
      group: (groups, groupId) => {
        const { groupName, groupOrder, budgetType } = dataObj;
        if (!groups[groupId]) {
          groups[groupId] = {
            groupName,
            groupOrder,
            budgetType,
            items: {}
          };
        }
      },

      item: (groupItems, itemId) => {
        const { groupIdRef, itemName, itemOrder, repeat, planned, dueDate } = dataObj;
        if (!groupItems[itemId]) {
          groupItems[itemId] = {
            groupIdRef,
            itemName,
            itemOrder,
            repeat,
            planned,
            dueDate,
            splits: {}
          };
        }
      },

      splitStore: (splitStore, splitId) => {
        const { itemIdRef, transactionIdRef, splitAmount } = dataObj;
        if (!splitStore[splitId]) {
          splitStore[splitId] = {
            itemIdRef,
            transactionIdRef,
            splitAmount
          };
        }
      },

      split: (itemSplits, splitId) => {
        const { itemIdRef, transactionIdRef, splitAmount } = dataObj;
        if (!itemSplits[splitId]) {
          itemSplits[splitId] = {
            itemIdRef,
            transactionIdRef,
            splitAmount,
            transaction: {}
          };
        }
      },

      transactionStore: (transactionStore, transactionId, splitId) => {
        const { transactionName, transactionType, transactionDate, checkNum, note, deleted } = dataObj;

        if (!transactionStore[transactionId]) {
          transactionStore[transactionId] = {
            transactionName,
            transactionType,
            transactionDate,
            checkNum,
            note,
            deleted,
            splits: {}
          };
        }

        transactionStore[transactionId].splits[splitId] = format.splitStore[splitId];
      },

      splitTransaction: (splitTransaction, transactionId) => {
        if (!splitTransaction[transactionId]) {
          splitTransaction[transactionId] = format.transactionStore[transactionId];
        }
      }

    };
  }
};

module.exports = format;