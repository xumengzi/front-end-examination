### 模拟实现`call`函数

`call`方法使用一个指定的`this`值和单独给出的一个或多个参数来调用一个函数。

##### [call](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call) 函数实现效果

```js
var a = 0;
var obj = {
  a: 1,
  b: 2,
};
function fn(x, y) {
  return this.a + "-" + x + "-" + y;
}
fn.call(); // 0-undefined-undefined
fn.call(obj, 3, 4); // 1-3-4
fn.call(null, 3, 4); // 0-3-4
```

##### 模拟`call`函数如下，需要注意的点

1. 模拟函数必须挂载在`Function`的原型上
2. 第一个参数如果是`null`，那么`this`就指向`window`

```js
Function.prototype.customizeCall = function (context, ...args) {
  var self = context || window;
  // this即是调用的fn函数
  self.fn = this;
  var result = self.fn(...args);
  // 防止第一个参数为对象时，带上了额外的fn函数
  delete self.fn;
  return result;
};
var a = 0;
var obj = {
  a: 1,
  b: 2,
};
function fn(x, y) {
  return this.a + "-" + x + "-" + y;
}
fn.customizeCall(); // 0-undefined-undefined
fn.customizeCall(obj, 3, 4); // 1-3-4
fn.customizeCall(null, 3, 4); // 0-3-4
```

### 模拟实现`apply`函数

`apply`方法调用一个具有给定`this`值的函数，以及以一个数组（或一个类数组对象）的形式提供的参数。

##### [apply](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 函数实现效果

```js
var a = 0;
var obj = {
  a: 1,
  b: 2,
};
function fn(x, y) {
  return this.a + "-" + x + "-" + y;
}
fn.apply(); // 0-undefined-undefined
fn.apply(obj, [3, 4]); // 1-3-4
fn.apply(null, [3, 4]); // 0-3-4
```

##### 模拟`apply`函数如下，需要注意的点

1. 模拟函数必须挂载在`Function`的原型上
2. 第一个参数如果是`null`，那么`this`就指向`window`
3. 注意自定义函数的第二个参数是一个数组，使用拓展运算符(...)时，必须注意类型

```js
Function.prototype.customizeApply = function (context, args = []) {
  var self = context || window;
  self.fn = this;
  var result = self.fn(...args);
  delete self.fn;
  return result;
};
var a = 0;
var obj = {
  a: 1,
  b: 2,
};
function fn(x, y) {
  return this.a + "-" + x + "-" + y;
}
fn.customizeApply(); // 0-undefined-undefined
fn.customizeApply(obj, [3, 4]); // 1-3-4
fn.customizeApply(null, [3, 4]); // 0-3-4
```

### 模拟实现`bind`函数

`bind` 方法创建一个新的函数，在`bind`被调用时，这个新函数的`this`被指定为`bind`的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

##### [bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 函数实现效果

```js
var a = 0;
var obj = {
  a: 1,
  b: 2,
};
function fn(x, y) {
  return this.a + "-" + x + "-" + y;
}
fn.bind()(); // 0-undefined-undefined
fn.bind(obj, 3, 4)(); // 1-3-4
fn.bind(null, 3, 4)(); // 0-3-4
```

##### 模拟`bind`函数如下

需要注意的点

1. 模拟函数必须挂载在`Function`的原型上
2. 第一个参数如果是`null`，那么`this`就指向`window`
3. `bind`函数返回的是函数，必须手动再执行

```js
Function.prototype.customizeBind = function (context, ...args) {
  var self = context || window;
  self.fn = this;
  return function () {
    var result = self.fn(...args);
    delete self.fn;
    return result;
  };
};
var a = 0;
var obj = {
  a: 1,
  b: 2,
};
function fn(x, y) {
  return this.a + "-" + x + "-" + y;
}
fn.customizeBind()(); // 0-undefined-undefined
fn.customizeBind(obj, 3, 4)(); // 1-3-4
fn.customizeBind(null, 3, 4)(); // 0-3-4
```

### 模拟实现`new`函数

`new`运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

##### [new](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 函数的实现效果

```js
function Fn(a, b) {
  this.a = a;
  this.b = b;
}
Fn.prototype.c = 3;
Fn.prototype.bar = function () {
  return this.a + this.b + this.c;
};

var res = new Fn(1, 2);
res.a; // 1
res.c; // 3
res.bar(); // 6
```

##### 模拟实现`new`函数如下

`new`操作符到底干了啥？

1. 创建一个空的简单`JavaScript`对象（即 {}）；
2. 为步骤 1 新创建的对象添加属性`__proto__`，将该属性链接至构造函数的原型对象；
3. 将步骤 1 新创建的对象作为`this`的上下文；
4. 如果该函数没有返回对象，则返回`this`。

> `__proto__`属性其实是废弃了的，请勿使用，也包括生产环境，[参见 proto](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)
> 另外，可以看看[Object.create](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)，查看详细内容

```js
function Fn(a, b) {
  this.a = a;
  this.b = b;
}
Fn.prototype.c = 3;
Fn.prototype.bar = function () {
  return this.a + this.b + this.c;
};
// 自定义new函数，接受参数第一个为调用函数，后面为参数
function customizeNew(constructor, ...args) {
  /*
        这里不推荐这么写
        var obj = {}
        obj.__proto__ = constructor.prototype
        */
  var obj = Object.create(constructor.prototype);
  var result = constructor.call(obj, ...args);
  // result执行完如果返回对象就把这个对象返回出去，否则返回
  return result instanceof Object ? result : obj;
}

var res = customizeNew(Fn, 1, 2);
res.a; // 1
res.c; // 3
res.bar(); // 6
```

### 模拟实现`instanceof`函数

`instanceof`运算符用于检测构造函数的`prototype`属性是否出现在某个实例对象的原型链上。

#### [instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof) 实现效果

```js
function Bar() {}
var fn = new Bar();
var str = new String();
var num = new Number();

fn instanceof Bar; // true
str instanceof String; // true
num instanceof Number; // true
```

##### 模拟实现`instanceof`函数如下

需要注意的点有

1. 判断属性，方法是否存在
2. `isPrototypeOf`方法用来检测一个对象是否在另一个对象的原型链上

```js
function customizeInstance(instance, constructor) {
  if (constructor && constructor.prototype) {
    if (typeof constructor.prototype.isPrototypeOf === "function") {
      return constructor.prototype.isPrototypeOf(instance);
    }
    return false;
  }
  return false;
}
function Bar() {}
var fn = new Bar();
var str = new String();
var num = new Number();

customizeInstance(fn, Bar); // true
customizeInstance(fn, Object); // ture
customizeInstance(str, String); // true
customizeInstance(num, Number); // true
```

### 请实现深拷贝函数

需要注意的是，有些 hack 方法是有缺点的，比如扩展运算符，JSON.parse(JSON.stringify)

```js
//请实现深拷贝函数
function deepCopy(obj) {
  var result = Array.isArray(obj) ? [] : {};
  for (var i in obj) {
    if (typeof obj[i] === "object") {
      if (!obj[i]) {
        result[i] = obj[i];
      } else {
        result[i] = deepCopy(obj[i]);
      }
    } else {
      result[i] = obj[i];
    }
  }
  return result;
}

var obj = {
  a: 1,
  b: {
    c: 3,
  },
  d: function () {
    console.log("fn");
  },
  e: [1, 2, [3]],
  f: null,
  g: undefined,
};

var newObj = deepCopy(obj);
newObj.b.c = 33;
newObj.e.push(4);
console.log(obj, newObj);
```

### 实现发布（publish）订阅（subscribe）模式函数

这种模式可以解耦一些代码，让发布者和订阅者互相隔离，让代码更加清晰易懂

```js
/* 
    定义好构造函数
    handlers主要用来存放函数，采用对象，key是订阅者的名称，value是订阅者的函数
    */
function Pubsub() {
  this.handlers = {};
}
/*
    传入订阅名称和订阅函数
    */
Pubsub.prototype.on = function (subName, subHandler) {
  if (typeof subHandler === "function") {
    if (this.handlers[subName]) {
      this.handlers[subName].push(subHandler);
    } else {
      this.handlers[subName] = [subHandler];
    }
  } else {
    throw new Error(subHandler + " is not a function");
  }
};
/*
    取消订阅，同样传入名称和函数
    */
Pubsub.prototype.off = function (subName, subHandler, callback) {
  if (typeof subHandler === "function") {
    if (this.handlers[subName]) {
      var index = this.handlers[subName].findIndex(
        (item) => item === subHandler
      );
      this.handlers[subName].splice(index, 1);
      callback.call(this);
    } else {
      this.handlers = [];
    }
  } else {
    throw new Error(subHandler + " is not a function");
  }
};
/*
    发布函数
    */
Pubsub.prototype.emit = function (subName, ...args) {
  if (this.handlers[subName]) {
    this.handlers[subName].forEach((item) => {
      item.call(this, ...args);
    });
  } else {
    return;
  }
};
// 商店开业
var store = new Pubsub();
function fn(food) {
  console.log("eat:" + food);
}
// 张三订阅了eat
var zhangsan = store.on("eat", fn);
store.emit("eat", "chips");
// 吃完了
setTimeout(() => {
  console.log("吃完了");
  store.off("eat", fn, () => {
    console.log("吃不下了");
  });
}, 1000);

// 再给你吃
setTimeout(() => {
  console.log("再吃一个");
  store.emit("eat", "chips");
}, 2000);
```

### 实现`debounce`防抖函数

防抖函数主要用在触发频率，次数非常多的地方，为了提高性能，我们可以做一下限制，尽量减少这种调用次数

```js
// 核心思想：如果频繁触发，那么就一直清理定时器，只有停下来，等待固定时间后才执行
function debounce(fn, wait = 300) {
  var timer = null;
  return function () {
    clearTimeout(timer);
    var args = arguments;
    timer = setTimeout(() => {
      fn.call(this, ...args);
    }, wait);
  };
}
// 可以看这2个函数的区别
document.addEventListener(
  "mousemove",
  function (e) {
    console.log("mousemove1", this, e.target);
  },
  false
);
document.addEventListener(
  "mousemove",
  debounce(function (e) {
    console.log("mousemove2", this, e.target);
  }, 500),
  false
);
```

### 实现`throttle`节流函数

节流函数也是控制执行频率和次数，无论用户操作多少次，这个函数能够保证固定时间执行 1 次

```js
// 核心思想：如果小于固定的时间内，那么函数不执行
function throttle(fn, wait) {
  var start = +new Date();
  return function () {
    var end = +new Date();
    var args = arguments;
    if (end - start > wait) {
      fn.call(this, ...args);
      start = end;
    }
  };
}
// 可以看这2个函数的区别
document.addEventListener(
  "mousemove",
  function (e) {
    console.log("mousemove1", e.target);
  },
  false
);
document.addEventListener(
  "mousemove",
  throttle(function (e) {
    console.log("mousemove2", e.target);
  }, 500),
  false
);
```

### 实现`webpack`里的`plugin`

一句话概括`Plugin`：可以在`webpack`构建的各个生命周期对文件进行更改。
`plugin`的实现需要注意以下几个点：

1. 必须是一个`JS`的类或者命名函数
2. 在函数原型上有一个`apply`函数
3. 在不同生命周期调用不同的函数进行操作，必要时调用`webpack`的回调

这里有一个非常简单的例子，具体的例子见：

```js
class ExamplePlugin {
  // 处理传进来的配置
  constructor(options) {
    this.options = Object.assgin({}, defaultOptions, options);
  }

  // 参数compiler对象
  apply(compiler) {
    compiler.hooks.emit.tap("ExamplePlugin", (compilation, callback) => {
      // compilation对象上有很多方法，比如可以获取当前编译的状态对象，添加模块
      compilation.finish(() => {
        console.log("finish");
      });
      // compilation的钩子上也有很多方法
      compilation.hooks.optimize.tap(pluginName, () => {
        console.log("资源已经优化完毕。");
      });
    });
  }
}
module.exports = ExamplePlugin;
```

### 实现 webpack 里的 loader

一句话概括`loader`：对模块的源代码进行转换的，比如`scss`转换成`css`，`ts`转换成`js`

具体简介：\* [0.3 webpack-loader 解析](/summary/loader.md)

### webpack 的 Tree Shaking 原理

具体简介：\* [0.3 webpack-loader 解析](/summary/treeShaking.md)

### 实现 Promise

具体简介：\* [0.6 promise 解析](/summary/promise.md)

### 实现`Promise.all`

`Promise.all`方法接收一个`Promise`的`iterable`类型（包括`Array`，`Map`，`Set`）的输入，并且只返回一个`Promise`实例，而输入的所有`Promise`的`resolve`回调的结果是一个数组。
注意是所有的`Promise`都执行完毕才返回，如果其中任意一个`reject`执行，就会立刻抛出错误，并且`reject`的是第一个错误信息。详见[Promise.all](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

```js
// 官方例子
var promise1 = Promise.resolve("promise1");
var promise2 = "promise2";
var promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise3");
  }, 1000);
});
// 这个函数用来判断是不是promise
function isPromise(fn) {
  if ((typeof fn === "object" && fn !== null) || typeof fn === "function") {
    if (typeof fn.then === "function") {
      return true;
    }
  }
  return false;
}
// 我们模拟实现覆盖Promise.all方法
Promise.all = function (promiseList) {
  return new Promise(function (resolve, reject) {
    var result = [];
    var length = 0;
    function handlePromises(inx, value) {
      result[inx] = value;
      length++;
      // 记住全部返回有值了，我们才resolve出去
      if (length === promiseList.length) {
        resolve(result);
      }
    }
    for (let index = 0; index < promiseList.length; index++) {
      var tempPromise = promiseList[index];
      if (isPromise(tempPromise)) {
        tempPromise
          .then((res) => {
            handlePromises(index, res);
          })
          .catch((err) => {
            reject(err); // 只要有一个失败了，我们就reject出去
          });
      } else {
        handlePromises(index, tempPromise);
      }
    }
  });
};
Promise.all([promise1, promise2, promise3])
  .then((res) => {
    console.log("res: ", res); // ['promise1', 'promise2', 'promise3']
  })
  .catch((err) => {
    console.log("err: ", err);
  });
```

### 请把一段虚拟 `dom` 转换成真实的 `dom`

核心思想：

1. 因为结构是树形，那么必须用到递归
2. 数组循环的时候，第一层需要用最外层的`div`来包裹，而二层，三层往后则需要递归放到一层生成的 `dom` 里

```js
var obj = [
  {
    tag: "DIV",
    attrs: {
      id: "a",
      class: "b",
    },
    text: "nima",
    children: [
      {
        tag: "span",
        text: "我去",
        children: [
          {
            tag: "a",
            attrs: {
              href: "https://www.baidu.com/",
            },
            text: "百度",
          },
        ],
      },
    ],
  },
  {
    tag: "P",
    text: "请问",
  },
];
function render(arr) {
  const content = document.createElement("div");
  function _add(arr, bool) {
    var tempDom = "";
    arr.forEach((item, index) => {
      tempDom = document.createElement(item.tag);
      tempDom.innerHTML = item.text || "";
      for (var i in item.attrs) {
        tempDom.setAttribute(i, item.attrs[i]);
      }
      if (item.children && item.children.length) {
        tempDom.appendChild(_add(item.children));
      }
      if (bool) {
        content.appendChild(tempDom);
      }
    });
    return tempDom;
  }
  content.appendChild(_add(arr, true));
  return content;
}

var example = render(obj);
/*
<div>
    <div id="a" class="b">
        nima
        <span>
            我去<a href="https://www.baidu.com/">百度</a>
        </span>
    </div>
    <p>请问</p>
</div>
*/
```

### 请回答下面函数的执行结果

```js
function Foo() {
  log = function () {
    console.log(1);
  };
  return this;
}
Foo.log = function () {
  console.log(2);
};
Foo.prototype.log = function () {
  console.log(3);
};
var log = function () {
  console.log(4);
};
function log() {
  console.log(5);
}
/*答案解析
    构造函数Foo上的log方法，这个就是Foo.log函数
    执行完毕打印1
    */
Foo.log();

/*答案解析
    执行window方法上的log方法，看上述代码，由于var变量提升，最后log函数是log = function () {console.log(4);};
    执行完毕打印4
    */
log();

/*答案解析
    构造函数执行完之后，返回了this，指向window，接着执行log函数
    执行完毕打印4
    */
Foo().log();

/*答案解析
    注意上述Foo()执行完了之后，里面有个log函数
    执行完毕打印1
    */
log();

/*答案解析
    运算符.的优先级比new操作符优先级高，相当于new (Foo.log)()
    执行完毕打印2
    */
new Foo.log();

/*答案解析
    构造函数经过new了之后，再调用log函数就是原型上的log函数
    执行完毕打印3
    */
new Foo().log();
```

### 请回答以下代码执行结果

```js
var x = 0;
var obj = {
  x: 10,
  bar() {
    var x = 20;
    console.log(this.x);
  },
};

obj.bar(); // this指向obj，执行完毕返回10
var foo = obj.bar; // 将obj.bar赋值给foo函数
foo(); // 再调用foo函数时，this指向的是window，函数里的x是局部变量，打印0
obj.bar.call(window); // call,apply,bind函数可以改变函数的this指向，指向传进去的第一个参数
obj.bar.apply(obj); // 10
foo.bind(obj)(); // 10
```

### 16.请写出以下代码的返回值

需要注意的点：

1. `js`是单线程的语言
2. 碰到一些浏览器的`web api`的时候，就会把这些任务放到一个专门处理这些任务的地方，也叫任务队列
3. 只有等当前执行栈里为空了，才会把任务队列里的代码拿过来执行
4. 以此类推。
5. `settimeout`，`setInterval`，`Ajax`等属于宏任务
6. `promise`的`then`，`process`的`nexttick`方法属于微任务，优先级比宏任务高

```js
console.log(1);
setTimeout(() => {
  console.log(2);
}, 1000);
setTimeout(() => {
  var p = new Promise((resolve, reject) => {
    console.log(3);
    resolve();
    console.log(3.5);
  }).then(() => {
    console.log(4);
  });
  Promise.resolve().then(() => {
    console.log(5);
  });
}, 0);
setTimeout(() => {
  Promise.resolve().then(() => {
    console.log(6);
  });
}, 0);
new Promise((resolve, reject) => {
  console.log(7);
  resolve();
}).then(() => {
  console.log(8);
});
Promise.resolve().then(() => {
  console.log(9);
});
async function async1() {
  await async2();
  console.log(10);
}
async function async2() {
  await async3();
  console.log(11);
}
async function async3() {
  console.log(12);
}
async1();
console.log(13);
// 1, 7, 12, 13, 8, 9, 11, 10, 3, 3.5, 4, 5, 6, 2
```

### 请实现函数科里化`currying`

```js
function currying(fn) {
  // 取到传进来的参数个数
  var args = [...arguments].slice(1);
  /* 
        如果和fn.length相等（fn.length表示函数应该拿的参数个数，
        arguments则是实际的），那么直接调用fn方法执行
        */
  if (fn.length === args.length) {
    return fn.apply(this, args);
  }
  // 这里处理不是上述的情形，需要用递归将参数push到args，直到和fn.length相等
  function _curry() {
    // 每次递归调用就push到参数数组里，直到和fn.length相等，那么直接执行即可
    args.push(...arguments);
    if (fn.length === args.length) {
      return fn.apply(this, args);
    }
    return _curry;
  }
  return _curry();
}
function add(a, b, c) {
  return a + b + c;
}
currying(add, 1, 2, 3); // 6
currying(add, 1, 2)(3); // 6
currying(add)(1)(2)(3); // 6
currying(add)(1, 2, 3); // 6
```

### 使用 `JS` 实现深度优先遍历（`DFS`）

深度优先遍历`DFS`，顾名思义在遍历树节点时可能深的搜索树的分支
![](../assets/tree.jpg)

1. 自上而下遍历最深的分支节点
2. 叶子节点再无子节点，回溯到父节点
3. 从左向右，遍历父节点的其他子节点，重复步骤 1 直到叶子节点，然后重复步骤 2 直至完成整个树的遍历

深度优先算法遍历采用栈`stack（first in last out）`先进后出的思想实现：

```js
// 这里有一棵树
var tree = {
  tag: "1",
  children: [
    {
      tag: "2",
      children: [
        {
          tag: "3",
          children: [
            {
              tag: "4",
            },
            {
              tag: "5",
            },
          ],
        },
        {
          tag: "6",
        },
      ],
    },
    {
      tag: "7",
    },
    {
      tag: "8",
      children: [
        {
          tag: "9",
          children: [
            {
              tag: "10",
            },
            {
              tag: "11",
            },
          ],
        },
        {
          tag: "12",
        },
      ],
    },
  ],
};
```

```js
// 采用递归的思想
function dfsRecursion(treeList, result = []) {
  treeList.forEach((item) => {
    result.push(item.tag);
    if (item.children) {
      return dfsRecursion(item.children, result);
    }
  });
  return result;
}
dfsRecursion([tree]).join("->"); // 1->2->3->4->5->6->7->8->9->10->11->12
```

```js
// 使用栈的思想
function dfsStack(node) {
  var result = [];
  var stack = [];
  if (node) {
    stack.push(node);
    while (stack.length) {
      var item = stack.pop();
      result.push(item.tag);
      while (item.children && item.children.length) {
        stack.push(item.children.pop());
      }
    }
  }
  return result;
}
dfsStack(tree).join("->"); // 1->2->3->4->5->6->7->8->9->10->11->12
```

# 使用 `JS` 实现广度优先遍历（`BFS`）

广度优先则是从上到下，自左向右层层遍历，即先遍历父节点，再遍历子节点。采用队列`queue（fisrt in first out）`先进先出的思想实现

```js
// tree同上那棵树
function bfsQueue(node) {
  var result = [];
  var queue = [];
  if (node) {
    queue.push(node);
    while (queue.length) {
      var item = queue.shift();
      result.push(item.tag);
      if (item.children) {
        item.children.forEach((ele) => {
          queue.push(ele);
        });
      }
    }
  }
  return result;
}
bfsQueue(tree).join("->"); // 1->2->7->8->3->6->9->12->4->5->10->11
```

### 带并发的异步调度器`Scheduler`

`continue`
