/**
 * 到 git 平台获取对应的 template
 */

const { resolve } = require('path');
const { execSync } = require('child_process');
const { copy, remove, readdirSync, renameSync, ensureDir } = require('fs-extra');
const ora = require('ora');
const download = require('download');
const { resolveCWD } = require('../utils/');

module.exports = async function got(ctx) {
  const {
    downloadType = 'http',
    template,
    dest,
    contentDir = '',
    registry = '',
    config = {},
  } = ctx;

  const templateName = template || registry;
  const { BRANCH, DOMAIN, GROUP, CLONE_DIR } = config;

  const downloadActions = {
    clone: ({ gitRegistry }) => {
      const baseDir = dest ? resolve(dest, CLONE_DIR) : CLONE_DIR;
      execSync(`git clone -b ${BRANCH} ${gitRegistry} ${baseDir} --depth=1`, {
        stdio: 'pipe',
      });
    },

    http: () => {
      const type = DOMAIN.split('.')[0];
      let url = '';

      if (type === 'github') {
        url = `${DOMAIN}/${GROUP}/${templateName}/archive/${BRANCH}.zip`;
      } else {
        url = `${DOMAIN}/${GROUP}/${templateName}/repository/archive.zip?ref=${BRANCH}`;
      }

      return download(url, dest, {
        extract: true,
      }).then(() => {
        // 拿到文件夹里面的内容
        const src = `${dest}/${readdirSync(dest)[0]}`;
        const destPath = `${dest}/${CLONE_DIR}`;

        return ensureDir(destPath).then(() => {
          renameSync(src, destPath);
        });
      });
    },
  };

  // 读取本地
  if (contentDir) {
    const baseDir = dest ? resolve(dest, CLONE_DIR) : CLONE_DIR;
    return copy(contentDir, baseDir);
  } else {
    const gitRegistry = `git@${DOMAIN}:${GROUP}/${templateName}.git`;
    const spinner = ora(`下载${templateName}模版...`).start();

    try {
      await downloadActions[downloadType]({ gitRegistry });
    } catch (err) {
      spinner.fail();
      throw new Error(`初始化 ${registry} 失败! \n原因是 ${err.message}`);
    }
    spinner.succeed();
    return remove(resolveCWD(CLONE_DIR, '.git'));
  }
};
