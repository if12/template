const path = require('path');
const fse = require('fs-extra');
const templateRender = require('./index');

const fixtures = path.resolve(process.cwd(), 'fixtures');

fse
  .ensureDir('./fixtures')
  .then(() =>
    templateRender({
      template: 'node-template',
      dest: fixtures,
      config: {
        GROUP: 'if12',
      },
      variable: {
        group: 'if12',
        project: 'test-template',
        version: '0.0.1',
        description: '',
      },
    })
  )
  .then(() => {
    console.log('初始化模版成功');
  });
