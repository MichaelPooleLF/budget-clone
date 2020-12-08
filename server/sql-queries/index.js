const request = require('./request');
const post = require('./post');

module.exports = {
  request: { ...request },
  post: { ...post }
};
