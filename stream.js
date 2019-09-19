const majo = require('majo');
const stream = majo();

// majo use 不支持数组, 先 hack 一把
stream.use = middlewares => {
  stream.middlewares = stream.middlewares.concat(middlewares);
  return stream;
};

module.exports = stream;
