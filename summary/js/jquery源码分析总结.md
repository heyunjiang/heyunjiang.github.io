1. undefined 虽然不是javascript保留字，但是一般浏览器都是不可以对其进行修改值的(除ie8)。
2. (function( window, undefined ) {})(window)，因为 ecmascript 执行JS代码是从里到外，因此把全局变量window或jQuery对象传进来，就避免了到外层去寻找，**提高效率** 。 **传参** undefined是防止了外部修改对函数内部传参的影响，因为修改undefined不起效，也是**提高效率**，只是一个普普通通的变量名。
3. DOM文档加载步骤：(1) 解析HTML结构。(2) 加载外部脚本和样式表文件。(3) 解析并执行脚本代码。(4) 构造HTML DOM模型。//ready(5) 加载图片等外部文件。(6) 页面加载完毕。//load
4. **jQuery.noConflict()**：将 `$` 转让给其他框架使用，jquery直接使用 `jquery(".class")` 操作。
5. 