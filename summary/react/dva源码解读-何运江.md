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

进入 `'./createDva'`,我们先看看它 import 了哪些主要工具: `react-redux`、`redux`、`redux-saga`。

export出createDva，在 `src/index` 里面已经执行了，它返回的是一个函数dva，dva执行则返回一个app对象，也就是我们使用dva的那几个简单api操作接口对象，

```
return function dva(hooks = {}) {
    // history and initialState does not pass to plugin
    const history = hooks.history || defaultHistory;
    const initialState = hooks.initialState || {};
    delete hooks.history;
    delete hooks.initialState;

    const plugin = new Plugin();
    plugin.use(hooks);

    const app = {
      // properties
      _models: [],
      _router: null,
      _store: null,
      _history: null,
      _plugin: plugin,
      // methods
      use,
      model,
      router,
      start,
    };
    return app;
```

我们使用dva进行如下操作 

```
import { message } from 'antd'
import dva from 'dva'
import createLoading from 'dva-loading'
import { browserHistory } from 'dva/router'
import 'babel-polyfill'

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: browserHistory,
  onError (error) {
    message.error(error.message)
  },
})

// 2. Model
app.model(require('./models/app'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
```

接下来我们仔细分析app对象里面的这几个属性。

#### 1. _models

_models为一个数组，保存的是当前已经加载的model，就是我们写的包含的`namespace`、`subscriptions`、`effects`、`reducers` 的models目录文件。用于提取store信息，方便`redux-sage`和`redux`处理。

#### 2. _router

_router为一个数组，保存的是我们定义的路由信息，用于直接添加到`react-redux`的`Provider`里面，没有其他处理。所以说dva对于路由并没有特殊处理，用的就是 `react-router`。

#### 3. _store

```
const store = this._store = createStore(
        createReducer(),
        initialState,
        compose(...enhancers),
      );
```

存储当前`namespace`下的store信息，`createStore`为redux的构建store方法

#### 4. _history

用于对`history`的一个重新赋值，真实起效的是history

#### 5. _plugin

保存当前使用的plugin信息，

```
const plugin = new Plugin();
plugin.use(hooks);
```

#### 6. use

**dva api use**

加载插件

#### 7. model

**dva api model**

加载model，将其push到_model数组中

#### 8. router

**dva api router**

router，将其push到_router数组中

#### 9. start

前面一些私有属性和3个公共方法，都是为start方法做准备的

### start细讲

1.support selector 获取dom容器

2.从model中装载reducers和sagas所需信息

```
	  const sagas = [];
      const reducers = { ...initialReducer };
      for (const m of this._models) {
        reducers[m.namespace] = getReducer(m.reducers, m.state);
        if (m.effects) sagas.push(getSaga(m.effects, m, onErrorWrapper));
      }
```

reducer加载model的reducer，saga加载model的effects

3.构建store


