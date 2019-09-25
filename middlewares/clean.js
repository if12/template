const { remove } = require('fs-extra');
const { resolve } = require('path');
const { resolveCWD } = require('../utils/');
const { CLONE_DIR } = require('../config');

module.exports = {
  cleanCloneDir: ctx => {
    const { dest } = ctx;
    const baseDir = dest ? resolve(dest, CLONE_DIR) : resolveCWD(CLONE_DIR);
    return remove(baseDir);
  },
};
