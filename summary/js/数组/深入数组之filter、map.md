## filter、map深入学习

从数组的这2个方面字面量来理解，分别表示过滤和映射，这里也可以归纳理解：filter方法表示对数组进行过滤，只获取我们想要的，返回过滤后的新数组；map表示对数组的一个映射，对数组的每个元素的映射操作，返回值组成新数组。

### map与forEach区别

forEach和map都是对数组的每一项进行的操作。

但是在回调函数中，forEach是对每一项进行操作处理，处理结果不会最后汇总；

map是对每一项操作处理，将每一项的返回值进行汇总，返回的是一个新数组。

### filter 过滤操作

```
let arr = [10, 2, 53];
arr.filter(function(item){return item%2;});

```

**filter的回调函数中，只能返回true 或者false，用于标识原数组的该项是否该返回，用于组成新数组。**

### map 映射

```
let arr = [10, 2, 53];
arr.map(function(item){return item+1;});

```

**map返回新数组，是将每个回调函数中的返回值作为新数组的项。**


>注：这2个方法是数组的Iteration方法，用于数组的遍历操作，还包括： `forEach`、`entries`、`keys`、`values`、`every`、`some`、`find`、`findIndex`、`reduce`、`reduceRight`