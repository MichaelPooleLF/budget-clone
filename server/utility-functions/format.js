
// formats incoming budget data
const format = {
  groups: {}, // stores generated group objects with items, splits, and transactions
  splitStore: {}, // used to reference splits
  transactionStore: {}, // used to reference transactions

  budget: data => {
    format.populateGroups(data); // fetches and creates groups

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

  // creates groups based on data rows
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
      // creates a group based on provided id if it does not exist
      group: (groups, groupId) => {
        if (!groups[groupId]) {
          const { groupName, groupOrder, budgetType } = dataObj;
          groups[groupId] = {
            groupName,
            groupOrder,
            budgetType,
            items: {}
          };
        }
      },

      // creates an item on a related group at itemId if it does not exist
      item: (groupItems, itemId) => {
        if (!groupItems[itemId]) {
          const { groupIdRef, itemName, itemOrder, repeat, planned, dueDate } = dataObj;
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

      // creates a split in splitStore at splitId if it does not exist
      splitStore: (splitStore, splitId) => {
        if (!splitStore[splitId]) {
          const { itemIdRef, transactionIdRef, splitAmount, monthId } = dataObj;
          splitStore[splitId] = {
            itemIdRef,
            transactionIdRef,
            splitAmount,
            monthId
          };
        }
      },

      // creates a split on item at splitId if it does not exist
      split: (itemSplits, splitId) => {
        if (!itemSplits[splitId]) {
          const { itemIdRef, transactionIdRef, splitAmount, monthId } = dataObj;
          itemSplits[splitId] = {
            itemIdRef,
            transactionIdRef,
            splitAmount,
            monthId,
            transaction: {}
          };
        }
      },

      // creates a transaction in the transactionStore at transactionId if it does not exist
      transactionStore: (transactionStore, transactionId, splitId) => {
        if (!transactionStore[transactionId]) {
          const { transactionName, transactionType, transactionDate, checkNum, note, deleted } = dataObj;
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

        // creates a referrence to the splitStoe at splitId. this prevents circular referrence
        transactionStore[transactionId].splits[splitId] = format.splitStore[splitId];
      },

      // creates a referrence to a transaction on split at transactionId if it does not exist
      splitTransaction: (splitTransaction, transactionId) => {
        if (!splitTransaction[transactionId]) {
          splitTransaction[transactionId] = format.transactionStore[transactionId];
        }
      }

    };
  }
};

module.exports = format;
