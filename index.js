const chalk = require('chalk');
const { emptyDirSync } = require('fs-extra');

const config = require('./config');
const middlewares = require('./middlewares/index');
const { runCmds, resolveCWD } = require('./utils/index');
const WareHub = require('./warehub');

process.on('unhandledRejection', err => {
  console.error(chalk.red(err.stack));
});

module.exports = function templateRender(context = {}) {
  const pickerWareHub = new WareHub();
  context.config = { ...config, ...context.config };

  return (
    pickerWareHub
      .use(middlewares)
      // 设置每一个中间件的context
      .run(context)
      // 执行完所有的中间件之后，可以执行你定义的命令
      .then(ctx => {
        runCmds(ctx.commands, ctx);
      })
      .catch(err => {
        // 初始化失败就清空当前目录
        emptyDirSync(resolveCWD(context.dest || ''));
        throw err;
      })
  );
};
