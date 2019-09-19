const got = require('./got');
const copy = require('./copy');
const inquire = require('./inquire');
const { cleanCloneDir } = require('./clean');
const store = require('./store');

/**
 * 拉下来模版代码
 * 读取模版的配置变量
 * 复制模版代码到本地目录
 * 清除之前拉下来的模版代码
 */
module.exports = [got, inquire, copy, cleanCloneDir, store];
