const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const { TEMPLATE_RC_FILE, TEMPLATE_CONFIG_FILE } = require('../config');
const resolveCWD = (...filepath) => path.resolve(process.cwd(), ...filepath);
const hasGit = dest => fs.existsSync(path.resolve(dest, '.git'));

const runCmds = (commands = [], ctx) => {
  commands.forEach(cmd => {
    execSync(cmd, {
      stdio: 'inherit',
      cwd: ctx.dest || process.cwd(),
    });
  });
};

const resolveTemplateRc = filepath => {
  const templateRcFile = resolveCWD(filepath, TEMPLATE_RC_FILE);
  if (fs.existsSync(templateRcFile)) {
    return require(templateRcFile);
  } else {
    return () => {};
  }
};

const defaultTemplateConf = {
  templateDidCollectMeta: meta => meta,
  templateWillAsk: () => [],
  templateDidMount: ({ commands } = {}) => commands,
};

const resolveTemplateConf = filepath => {
  const templateConfFile = resolveCWD(filepath, TEMPLATE_CONFIG_FILE);
  if (fs.existsSync(templateConfFile)) {
    const templateConf = require(templateConfFile);
    return {
      ...defaultTemplateConf,
      ...templateConf,
    };
  } else {
    return defaultTemplateConf;
  }
};

module.exports = { resolveCWD, runCmds, hasGit, resolveTemplateConf, resolveTemplateRc };
