const { remove } = require('fs-extra');
const { resolveCWD } = require('../utils/');
const { CLONE_DIR } = require('../config');

const clean = (...filePath) => {
  return () => {
    return remove(resolveCWD(...filePath));
  };
};

module.exports = {
  cleanCloneDir: clean(CLONE_DIR),
};
