## 原生js实现微信端长按事件

今天需求说做一个公众号批量审批功能，之前实现的是单个审批。

功能描述：在一个折叠列表中，长按某个列表头，子项列表出现选择框，然后对选择的子列表进行批量审批操作。

这里讲的是如何实现长按事件。

涉及到的主要有： `touchstart`、`touchmove`、`touchend`、`touchcancel`4个事件 以及 `touchEvent`对象。

### 1.问题点

1. 环境： 微信网页
2. 2个事件： 单击事件和长按事件
3. **实现长按事件**： 微信不自带长按事件支持，需要自己手动模拟或使用第三方库。
4. 微信长按事件： 微信长按会出现菜单：复制连接/在浏览器中打开

### 2.解决过程

(英语不怎么好，不到最后时候是不会去搞stackoverflow的)

首先百度，微信网页长按事件，然后知道了有`touchstart`、`touchmove`、`touchend`、`touchcancel`这4个dom事件。

然后突然想到zepto，里面实现了长按事件。然后就去看它的源码，因为用它的借鉴，可以考虑得更加完整点，它主要用到了定时器实现。

我这里没有使用定时器。

第一次实现： 为dom绑定`touchstart`、`touchmove`、`touchend`这3个事件，采用时间戳差(350ms)进行单击、长按判断，当出现 `touchmove` 的时候，就表示既不是单击也不是长按。实现结果：的确能实现单击和长按，但是在长按结束时，会自动触发微信默认的长按事件，就是弹出菜单，这不是我们希望看到的。

第二次实现： 这里就是阻止微信默认的事件。百度、sf了一下，并没有找到合理的结果，stackoverflow也只找到说要在`touchstart`中使用e.preventDefault，然后我也使用了，的确能阻止微信的默认事件，但是影响到了`touchmove`中进行的判断，我滑动时起点在dom上，也能触发长按事件，意思是`touchstart`中使用e.preventDefault后，`touchmove`中对数据操作将不起效，在`touchend`中的数据不再受`touchmove`影响了。

第三次实现： 那我们就不使用`touchmove`进行移动判断了，我们采用touchEvent进行判断，touchEvent包含了我们触摸的位置，大小，形状，压力大小和目标dom。
```
 this.el.addEventListener('touchstart',function(e){});
```

这里的e是包含什么值，使用`console.log`看一下。发现里面有3个List，查看changedTouches属性，发现里面包含了触摸的位置`clientX`、`clientY`，我们可以采用每次end时位置的变化，进行判断是否移动，success。

### 结果代码

>说明：使用weui实现的微信效果；由于测试的时候，没有给我测试号，我只能自己写代码，连接发到手机微信查看效果，真坑。

```javascript

function longTouch(el,fun){
    this.startTime = '';
    this.endTime = '';
    this.longTime = 350;
    this.startX = 0;
    this.startY = 0;
    this.el = el;
    this.fun = fun;
    this.init();
}
longTouch.prototype.init = function(){
    if(typeof(this.el)!='object'){return ;}
    let lt = this;
    this.el.addEventListener('touchstart',function(e){
        e.preventDefault();
        lt.startX = e.changedTouches[0].clientX;
        lt.startY = e.changedTouches[0].clientY;
        lt.startTime = new Date().getTime();
    });
    this.el.addEventListener('touchend',function(e){
        lt.endTime = new Date().getTime();
        if(Math.abs(e.changedTouches[0].clientX-lt.startX)>5 || Math.abs(e.changedTouches[0].clientY-lt.startY)>5){
            return ;
        }
        if(lt.endTime-lt.startTime>lt.longTime){
            return lt.fun(e);
        }else{
            weui.alert('单击');
        }
    });
}
        
function longTouchEvent(ev){
    weui.alert('长按')
}
new longTouch(document.querySelector('#test123'),longTouchEvent);

```