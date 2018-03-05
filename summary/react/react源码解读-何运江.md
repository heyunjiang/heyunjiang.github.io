# react 源码解读

1. `react` 单说的话，它是一个js库
2. `module.exports` es6模块导出
3. `Symbol` function，可以直接验证是否定义某个Symbol，唯一
4. `setState` 虽说setState不会立即更新，但是可以设置回调函数获取最新的值


## react 原理解读

### jsx

1. 在react dom中解析的
2. jsx中所有插入的js执行后都会成为string
3. 使用React.createElement(component, props, ...children)将jsx处理成object

jsx中只支持表达式运算，不支持其他运算。所以if、for不能应用在jsx中

jsx支持的条件运算

1. &&
2. ?:

### 组件更新

使用 ReactDom.render() 来创建元素、更新元素

> 会自动比较更新前后内容不懂，只更新修改了的部分

### 组件

#### 通信

通过props通信，只读，纯函数

组件间的数据通信通过props传输，属于数据单向流通

兄弟节点之间通信：通过共同父节点传递props通信(也叫做状态提升)

#### 有状态组件

`状态`：指的是只能在此组件中使用的值，代表此组件某一刻的状态

有状态组件，能使用局部状态this.state，使用this.props获取属性，都是react定义好的

有状态组件，能使用生命周期、钩子

例子：

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

#### 无状态组件

1. 不用继承 React.Component
2. 不使用this.state状态管理
3. 无生命周期处理

#### 受控组件

表单组件的值由react控制，这个组件叫做受控组件

#### 非受控组件

表单组件的值不由react控制，直接保存在DOM中，这个组件叫做非受控组件

### key

只需要在兄弟组件之间唯一就行，不必全局唯一

实现目的：

### ref

`ref={(input) => { this.input = input; }} />`

将 ref 属性添加在react组件上，这里第一个参数 input 代表真实dom或react实例

> 只能将ref添加在真实dom组件、react组件(class声明的)实例，不能添加在函数式组件(无状态)上

> ref 设置为 string方式已经被遗弃了

### context

全局获取状态数据方式，建议不使用，使用props,state或者redux实现

### 高阶组件 high order component

一个函数，接收参数为组件，返回新组件

## tips

1. 由于 JSX 编译后会调用 React.createElement 方法，所以在你的 JSX 代码中必须首先声明 React 变量
2. 大写开头的 JSX 标签表示一个 React 组件。这些标签将会被编译为同名变量并被引用，所以如果你使用了 <Foo /> 表达式，则必须在作用域中先声明 Foo 变量
3. 用大写开头命名组件
4. JSX 中使用字符串常量，react不会对其转义 `{'<3'}`
5. 如果没有给属性传值，它默认为 true

## synthetic event

同步事件对象，所有事件对象共享，只能同步方式获取属性，事件回调之后，所有属性会被置空，不能被异步访问

`synthetic event`：是react在基于浏览器原生事件的跨浏览器实现

在react直接触发的 `synthetic event` 格式如下

```javascript
Proxy {
  dispatchConfig: Object, 
  _targetInst: ReactDOMComponent, 
  isDefaultPrevented: function, 
  isPropagationStopped: function, 
  _dispatchListeners: function…
}
```
直接dom触发的 `dom event` 格式如下

```javascript
MouseEvent {
  isTrusted: true,
  screenX: 20,
  screenY: 115,
  clientX: 20,
  clientY: 23…
}
```

> 如何在 `synthetic event` 中访问原生 `dom event` 呢？
> 答： `synthetic event` 属性：target或currentTarget

>target与currentTarget 有什么区别？
>答：事件有冒泡和捕获2种阶段，事件冒泡就是由最具体的节点冒泡到事件最不具体的节点。在react `synthetic event` 中的阶段，`target` 永远指向最具体的目标，就是你当前操作的目标，而 `currentTarget` 指向的是你当前事件绑定的dom节点

> 为什么要有 `synthetic event` 存在呢？
> 答：为了方便用户开发，实现了跨浏览器，优化、简化了事件的各种操作，提供统一接口。通过es6的Proxy实现