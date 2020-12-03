const dataEx = data => {
  const returnThis = {
    [data[0].month]: {
      id: data[0].monthId,
      year: data[0].year,
      groups: [
        {
          id: data[0].groupId,
          name: data[0].groupName,
          order: data[0].groupOrder,
          type: data[0].budgetType,
          items: [
            {
              id: data[0].itemId,
              name: data[0].itemName,
              order: data[0].itemOrder,
              planned: data[0].planned,
              spent: data[0].spent,
              dueDate: data[0].dueDate,
              repeat: data[0].repeat,
              splits: [
                {
                  id: data[0].splitId,
                  amount: data[0].splitAmount,
                  transactionId: data[0].transactionId
                }
              ],
              transactions: [
                {
                  id: data[0].transactionId,
                  name: data[0].transactionName,
                  type: data[0].transactionType,
                  checkNum: data[0].checkNum,
                  note: data[0].note,
                  date: data[0].transactionDate,
                  deleted: data[0].deleted
                }
              ]
            }
          ]
        }
      ]
    }
  };
  return returnThis;
};

const format = {
  budget: function (data) {
    const budget = {
      [data.month]: {
        id: data.monthId,
        year: data.year
      }
    };
    return budget;
  },
  month: function (data) {
    const groupsArr = this.getGroups(data);
    const month = {
      [data[0].month]: {
        id: data[0].monthId,
        year: data[0].year,
        groups: groupsArr
      }
    };
    return month;
  },
  getGroups: function (data) {
    this.groups = this.uniqueIds(data, 'groupId');
    data.forEach(dataObj => {
      const groupIndex = this.groups.indexOf(dataObj.groupId);
      const inArray = groupIndex !== -1;
      if (inArray) {
        this.setGroups(groupIndex, dataObj);
      }
    });
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
    data.forEach(dataObj => {
      const itemIndex = this.items.indexOf(dataObj.itemId);
      const inArray = itemIndex !== -1;
      if (inArray) {
        this.setItems(itemIndex, dataObj);
      }
    });
    return this.items;
  },
  transactions: function (data) {},
  splits: function (data) {},
  getData: function (data) {
    return dataEx(data);
  },
  uniqueIds: function (data, type) {
    const idSet = new Set();
    data.forEach(dataObj => {
      idSet.add(dataObj[type]);
    });
    const idArr = [...idSet];
    return idArr;
  },
  setGroups: function (index, data) {
    this.groups[index] = {
      id: data.groupId,
      name: data.groupName,
      order: data.groupOrder,
      type: data.budgetType
    };
  },
  setItems: function (index, data) {
    this.items[index] = {
      id: data.itemId,
      name: data.itemName,
      order: data.itemOrder,
      planned: data.planned,
      spent: data.spent,
      dueDate: data.dueDate,
      repeat: data.repeat,
      groupIdRef: data.groupIdRef
    };
  }
};

module.exports = format;

// format.month();
// dataEx([]);
