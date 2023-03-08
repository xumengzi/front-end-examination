### 1.模拟实现`call`函数

##### [call](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call) 函数实现效果
```js
var a = 0;
var obj = {
    a: 1,
    b: 2
}
function fn(x, y) {
    return this.a + '-' + x  + '-'+ y;
}
fn.call() // 0-undefined-undefined
fn.call(obj, 3, 4); // 1-3-4
fn.call(null, 3, 4); // 1-3-4
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
    b: 2
}
function fn(x, y) {
    return this.a + '-' + x + '-'+ y;
}
fn.customizeCall() // 0-undefined-undefined
fn.customizeCall(obj, 3, 4); // 1-3-4
fn.customizeCall(null, 3, 4); // 0-3-4
```

### 2.模拟实现`apply`函数

##### [apply](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 函数实现效果
```js
var a = 0;
var obj = {
    a: 1,
    b: 2
}
function fn(x, y) {
    return this.a + '-' + x  + '-'+ y;
}
fn.apply() // 0-undefined-undefined
fn.apply(obj, [3, 4]); // 1-3-4
fn.apply(null, [3, 4]); // 1-3-4
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
    b: 2
}
function fn(x, y) {
    return this.a + '-' + x + '-'+ y;
}
fn.customizeApply() // 0-undefined-undefined
fn.customizeApply(obj, [3, 4]); // 1-3-4
fn.customizeApply(null, [3, 4]); // 0-3-4
```

### 3.模拟实现`bind`函数

##### [bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 函数实现效果
```js
var a = 0;
var obj = {
    a: 1,
    b: 2
}
function fn(x, y) {
    return this.a + '-' + x  + '-'+ y;
}
fn.bind()() // 0-undefined-undefined
fn.bind(obj, 3, 4)(); // 1-3-4
fn.bind(null, 3, 4)(); // 1-3-4
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
        var result = self.fn(...args)
        delete self.fn;
        return result
    }
};
var a = 0;
var obj = {
    a: 1,
    b: 2
}
function fn(x, y) {
    return this.a + '-' + x + '-'+ y;
}
fn.customizeBind()() // 0-undefined-undefined
fn.customizeBind(obj, 3, 4)(); // 1-3-4
fn.customizeBind(null, 3, 4)(); // 0-3-4
```

### 模拟实现`new`函数

##### [new](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 函数的实现效果

```js
function Fn(a, b) {
    this.a = a;
    this.b = b;
}
Fn.prototype.c = 3;
Fn.prototype.bar = function (){
    return this.a + this.b + this.c
}

var res = new Fn(1, 2);
res.a // 1
res.c // 3
res.bar() // 6
```

##### 模拟实现`new`函数如下
`new`操作符到底干了啥？
1. 创建一个空的简单`JavaScript`对象（即 {}）；
2. 为步骤1新创建的对象添加属性`__proto__`，将该属性链接至构造函数的原型对象；
3. 将步骤1新创建的对象作为`this`的上下文；
4. 如果该函数没有返回对象，则返回`this`。

>`__proto__`属性其实是废弃了的，请勿使用，也包括生产环境，[参见proto](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)
>另外，可以看看[Object.create](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)，查看详细内容

```js
function Fn(a, b) {
    this.a = a;
    this.b = b;
}
Fn.prototype.c = 3;
Fn.prototype.bar = function (){
    return this.a + this.b + this.c
}
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
res.a // 1
res.c // 3
res.bar() // 6
```