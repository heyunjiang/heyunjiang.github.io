# dva 源码解读

[dva](https://github.com/dvajs/dva): 基于redux、react-redux、redux-saga、react-router 的轻量级框架

## 目录结构说明

```bash
├── /dist/            # 项目输出目录
├── /lib/             # 项目源码编译后的库目录
├── /src/             # 项目源码目录
│ ├── createDva.js    # 主要源码目录
│ ├── handleActions.js   
│ ├── index.js        # 源码入口文件
│ ├── mobile.js       # 移动端入口文件及源码
│ └── plugin          # 插件加载工具函数     
├── index.js     	  # dva默认入口
├── mobile.js         # dva 移动端支持入口
└── router.js    	  # 路由输出
```

### 源码解读

进入src目录进行源码查看，`index.js`是作为项目的入口文件，执行createDva，导出dva函数

```index.js
import hashHistory from 'react-router/lib/hashHistory';
import {
  routerMiddleware,
  syncHistoryWithStore,
  routerReducer as routing,
} from 'react-router-redux';
import createDva from './createDva';

export default createDva({
  mobile: false,
  initialReducer: {
    routing,
  },
  defaultHistory: hashHistory,
  routerMiddleware,

  setupHistory(history) {
    this._history = syncHistoryWithStore(history, this._store);
  },
});
```
