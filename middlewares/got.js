/**
 * 到 git 平台获取对应的 template
 */

const { execSync } = require('child_process');
const { copy, remove } = require('fs-extra');
const ora = require('ora');
const { resolveCWD } = require('../utils/');

// TODO 可以支持多种拉取模版的能力
module.exports = function got(ctx) {
  const { template, group, contentDir = '', registry = '', config = {} } = ctx;
  const templateName = template || group || registry;
  const { BRANCH, DOMAIN, GROUP, CLONE_DIR } = config;

  // 读取本地
  if (contentDir) {
    return copy(contentDir, CLONE_DIR);
  } else {
    const registry = `git@${DOMAIN}:${GROUP}/${templateName}.git`;
    const spinner = ora(`下载${templateName}模版...`).start();

    try {
      execSync(`git clone -b ${BRANCH} ${registry} ${CLONE_DIR} --depth=1`, {
        stdio: 'pipe',
      });
    } catch (err) {
      spinner.fail();
      throw new Error(`获取 ${registry} 失败! \n原因是 ${err.message}`);
    }
    spinner.succeed();
    return remove(resolveCWD(CLONE_DIR, '.git'));
  }
};
