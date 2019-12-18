const { extname, basename, resolve } = require('path');
const prettier = require('prettier');
const ejs = require('ejs');

const stream = require('../stream');
const createCmds = require('../cmd');
const { resolveCWD, resolveTemplateConf, resolveTemplateRc } = require('../utils/index');

const CWD = process.cwd();
const isJSFile = filePath => extname(filePath) == '.js';
const notSeedFile = filePath => basename(filePath, '.js') !== 'seed';

function ejsRender(ctx) {
  return Promise.all(
    ctx.fileList.map(filePath => {
      const content = ctx.fileContents(filePath);
      const res = ejs.render(content, ctx.meta.variable);
      ctx.writeContents(filePath, res);
    })
  );
}

function format(ctx) {
  return Promise.all(
    ctx.fileList.map(filePath => {
      const content = ctx.fileContents(filePath);
      let res;
      if (isJSFile(filePath) && notSeedFile(filePath)) {
        res = prettier.format(content, {
          parser: 'babel',
          singleQuote: true,
          printWidth: 100,
          trailingComma: 'es5',
          arrowParens: 'always',
        });
      } else {
        res = content;
      }

      ctx.writeContents(filePath, res);
    })
  );
}

const defaultMiddlewares = [
  {
    name: 'ejsRender',
    fn: ejsRender,
  },
  {
    name: 'format',
    fn: format,
  },
];

const getMiddleware = middleware => middleware.fn;
// 传给模版中间件的数据结构是一个 map
// { ejsRender: ejsRender, format: format }
// 方便使用直接解构即可, 不需要关心顺序
const toMiddlewareMap = middlewares =>
  middlewares.reduce((acc, middleware) => {
    const { name, fn } = middleware;
    return {
      ...acc,
      [name]: fn,
    };
  }, {});

module.exports = function copy(ctx) {
  const { config = {}, dest } = ctx;
  const { CLONE_DIR, TEMPLATE_CONTENT_DIR } = config;
  const baseDir = dest ? resolve(dest, CLONE_DIR) : CLONE_DIR;
  const tailor = resolveTemplateRc(baseDir);

  const {
    templateWillCopy = () => defaultMiddlewares,
    templateDidCollectMeta,
    templateDidMount,
  } = resolveTemplateConf(baseDir, ctx);

  // 模版可以自定义中间件
  const middlewares = templateWillCopy(toMiddlewareMap(defaultMiddlewares)).map(getMiddleware);
  // 收集模版的元信息
  const meta = templateDidCollectMeta(ctx);
  // 收集模版的命令
  const commands = templateDidMount({ commands: createCmds(meta) });

  stream.meta = {
    ...ctx.answers,
    ...meta,
    commands,
  };

  const baseDir = dest
    ? resolve(dest, CLONE_DIR, TEMPLATE_CONTENT_DIR)
    : resolveCWD(CLONE_DIR, TEMPLATE_CONTENT_DIR);

  return stream
    .source([`**`], {
      baseDir,
    })
    .use([tailor, ...middlewares])
    .dest(dest || CWD, {
      baseDir: '/',
    })
    .catch(err => {
      throw err;
    });
};
