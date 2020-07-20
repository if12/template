const Koa = require('koa');
const path = require('path');
const fse = require('fs-extra');
const go = require('./go');
const app = new Koa();

const fixtures = path.resolve(process.cwd(), 'fixtures');

app.use(async (ctx) => {
  if (ctx.path === '/init') {
    await go();
    fse.removeSync(fixtures);
  }
  ctx.body = 'Hello Koa';
});

app.listen(3100, () => {
  console.log('http://localhost:3100');
});
