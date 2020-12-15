const { post } = require('../sql-queries');

const create = {

  // generates the sql query for adding splits based on the number of splits provided
  splitQuery: arr => {
    let counter = 1;
    let query = post.split;

    for (let i = 0; i < arr.length; i++) {
      let newValueSet = '';

      if (i === arr.length - 1) {
        newValueSet = ` ($${counter++}, $${counter++}, $${counter++}) RETURNING *;`;
      } else {
        newValueSet = ` ($${counter++}, $${counter++}, $${counter++}),`;
      }
      query += newValueSet;
    }

    return query;
  },

  // generates an array of parameters that line up with the generated sql query
  splitParams: (arr, transactionId) => {
    const params = [];

    arr.forEach(split => {
      params.push(transactionId, split.itemIdRef, split.splitAmount);
    });

    return params;
  }
};

module.exports = create;
