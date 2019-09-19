/**
 * 模版定义的变量存储
 */

const stream = require('../stream');
const store = () => {
  return Promise.resolve(stream.meta);
};

module.exports = store;
