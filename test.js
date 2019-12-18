const path = require('path');
const fse = require('fs-extra');
const meow = require('meow');
const templateRender = require('./index');

const fixtures = path.resolve(process.cwd(), 'fixtures');
const cli = meow('', {
  contentDir: {
    type: 'string',
  },
});

const { contentDir } = cli.flags;
const templateConf = contentDir ? { templateDidMount: () => [] } : {};
const options = {
  template: 'node-template',
  dest: fixtures,
  contentDir,
  templateConf,
  config: {
    GROUP: 'if12',
    TEMPLATE_CONTENT_DIR: '',
  },
  variable: {
    group: 'if12',
    project: 'test-template',
    version: '0.0.1',
    description: '',
  },
};

fse
  .ensureDir('./fixtures')
  .then(() => templateRender(options))
  .then(() => {
    console.log('初始化模版成功');
  });
