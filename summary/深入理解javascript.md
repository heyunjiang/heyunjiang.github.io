# javascript 语言解释

****

## javascript 语言特性

是一门跨平台、面向对象的轻量级脚本语言。

在宿主中通过连接环境对象来实现可控制编程。

语言内置了一系列对象的标准库：数组，日期，数字

语言内置核心元素：运算符，流程控制符，语句

## 客户端的 javascript

javascript + dom + bom

## 服务器端的 javascript

javascript + fr等对象(nodejs)

## javascript 与 ECMASCRIPT

ECMA: 欧洲信息与通信系统标准化协会

ECMASCRIPT：该协会发布的标准javascript规范

ECMAScript 文档并不是旨在帮助脚本程序员；编写脚本时请参考  JavaScript 文档。


> 调试javascript代码：在firefox中按 `shift f4` 可以打开代码草稿纸，更方便js代码的书写

# javascript语法和数据类型

****

1. javascript `区分大小写` ，使用 `unicode` 字符集

> unicode是国际通用编码，编码为unicode编码，分为utf-8,utf-16,utf-32；它的字符集叫unicode字符集

2. 从左到右进行扫描，然后将一条一条的 `指令` 进行解释
3. `三种声明` ：变量、局部变量、常量
4. javascript的变量类型是 `动态变量` 的，所以在声明变量后为其赋予不同类型的值都是可以的
5. `-号运算符`：'34'-4=30;'34'+4='344';
6. `标签语句`：定义标签语句。使用 `break label` 和 `continue label` 可以直接跳转到标签语句，执行对应的break或continue
7. `try-catch` 可以使用 throw 抛出任意值的错误，捕获并处理
8. `默认参数和剩余参数`：es6支持默认参数和剩余参数
9. `箭头函数的this`：箭头函数能够捕捉闭包上下文的this


## javascript 预定义函数

顶级的内建函数

1. parseInt()
2. parseFloat()
3. isNaN()
4. isFinite()--是否是有限的数值
5. eval()--字符串->可执行的源代码
6. uneval()--源代码->字符串
7. decodeURI
8. encodeURI
9. decodeURIComponent
10. encodeURIComponent

