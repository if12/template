/**
 * Inquirer.js
 */
const { basename } = require('path');
const inquirer = require('inquirer');
const { resolveCWD, resolveTemplateConf } = require('../utils/index');

module.exports = function inquire(ctx) {
  const { config = {} } = ctx;
  const dirname = basename(resolveCWD(''));
  const { templateWillAsk } = resolveTemplateConf(config.CLONE_DIR);
  const questions = templateWillAsk({ dirname });

  if (questions.length === 0) {
    return Promise.resolve();
  } else {
    return inquirer.prompt(questions).then(answers => {
      ctx.answers = answers;
      return answers;
    });
  }
};
