## template

> 配置模版渲染器

### API

```js
const templateRender = require('use-template');
templateRender({
  template: 'ascp-query-list',
  group: 'ascp-comp',
  project: 'test-template',
  version: '5.0.0',
  author: 'kaihao.zkh',
});
```

### 模版目录结构

会默认读取 template 文件夹里面的内容复制到当前目录

```js
├── README.md
└── template
  ├── README.md
  ├── __gitignore
  ├── ...
```