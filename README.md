## template

> 配置模版渲染器

### Installation

```bash
npm install use-template
```

### 使用

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

### API

|     参数     |           说明            |  类型  |   默认值   |
| :----------: | :-----------------------: | :----: | :--------: |
|   template   |         模版名称          | String |     无     |
| downloadType | 下载方式(clone 或者 http) | String |    http    |
|   variable   |       模版内容变量        | Object |     {}     |
|     dest     | 模版初始到对应的目的目录  | String | 当前文件夹 |
