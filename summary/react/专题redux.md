## 主旨(约定)

应用只有一个store，当应用变大的时候，store可以拆分

问题：redux是否适用于多页应用？

### action

js 对象

```javascript
{
  type: ADD_TODO,
  text: 'text'
}
```

关键词：`action`、`action创建函数`、`dispatch绑定的action创建函数`

### 