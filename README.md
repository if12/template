## template

> 配置模版渲染器

### Installation

```bash
npm install use-template
```

### API

```js
const templateRender = require('use-template');
templateRender({
  template: 'ascp-query-list',
  variable: {
    group: 'ascp-comp',
    project: 'test-template',
    version: '5.0.0',
    author: 'kaihao.zkh',
    description: '',
  },
});
```

### 模版目录结构

会默认读取 template 文件夹里面的内容复制到当前目录

```js
├── README.md
├── tpl.config.js
├── tplrc.js
└── template
  ├── __gitignore
  ├── ...
```
