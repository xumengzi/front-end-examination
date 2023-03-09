### 1.模拟实现`call`函数
`call`方法使用一个指定的`this`值和单独给出的一个或多个参数来调用一个函数。

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
`apply`方法调用一个具有给定`this`值的函数，以及以一个数组（或一个类数组对象）的形式提供的参数。

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
`bind` 方法创建一个新的函数，在`bind`被调用时，这个新函数的`this`被指定为`bind`的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

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

### 4.模拟实现`new`函数

`new`运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。
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

### 5.模拟实现`instanceof`函数
`instanceof`运算符用于检测构造函数的`prototype`属性是否出现在某个实例对象的原型链上。

#### [instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof) 实现效果

```js
function Bar() {}
var fn = new Bar();
var str = new String();
var num = new Number();

fn instanceof Bar // true
str instanceof String // true
num instanceof Number // true
```

##### 模拟实现`instanceof`函数如下
需要注意的点有
1. 判断属性，方法是否存在
2. `isPrototypeOf`方法用来检测一个对象是否在另一个对象的原型链上

```js
function customizeInstance(instance, constructor) {
    if (constructor && constructor.prototype) {
        if (typeof constructor.prototype.isPrototypeOf === 'function') {
            return constructor.prototype.isPrototypeOf(instance)
        }
        return false;
    }
    return false
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

### 6.实现发布（publish）订阅（subscribe）模式函数
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
Pubsub.prototype.on = function(subName, subHandler) {
    if(typeof subHandler === 'function') {
        if(this.handlers[subName]) {
            this.handlers[subName].push(subHandler);
        }else {
            this.handlers[subName] = [subHandler];
        }
    }else {
        throw new Error(subHandler + ' is not a function');
    }
}
/*
    取消订阅，同样传入名称和函数
    */
Pubsub.prototype.off = function(subName, subHandler, callback) {
    if(typeof subHandler === 'function') {
        if(this.handlers[subName]) {
            var index = this.handlers[subName].findIndex(item => item === subHandler);
            this.handlers[subName].splice(index, 1);
            callback.call(this);
        }else {
            this.handlers = [];
        }
    }else {
        throw new Error(subHandler + ' is not a function');
    }
}
/*
    发布函数
    */ 
Pubsub.prototype.emit = function(subName, ...args) {
    if(this.handlers[subName]) {
        this.handlers[subName].forEach(item => {
            item.call(this, ...args);
        })
    }else {
        return;
    }
}
// 商店开业
var store = new Pubsub();
function fn(food) {
    console.log('eat:' + food);
}
// 张三订阅了eat
var zhangsan = store.on('eat', fn)
store.emit('eat', 'chips');
// 吃完了
setTimeout(()=>{
    console.log('吃完了');
    store.off('eat', fn, () => {
        console.log('吃不下了');
    });
}, 1000);

// 再给你吃
setTimeout(() => {
    console.log('再吃一个');
    store.emit('eat', 'chips');
}, 2000);
```

### 7.实现`debounce`防抖函数
防抖函数主要用在触发频率，次数非常多的地方，为了提高性能，我们可以做一下限制，尽量减少这种调用次数

```js
// 核心思想：如果频繁触发，那么就一直清理定时器，只有停下来，等待固定时间后才执行
function debounce(fn, wait = 300) {
    var timer = null;
    return function() {
        clearTimeout(timer);
        var args = arguments;
        timer = setTimeout(() => {
            fn.call(this, ...args)
        }, wait);
    };
};
// 可以看这2个函数的区别
document.addEventListener('mousemove', function(e){
    console.log('mousemove1', this, e.target);
}, false);
document.addEventListener('mousemove', debounce(function(e){
    console.log('mousemove2', this, e.target);
}, 500), false);
```

### 8.实现`throttle`节流函数
节流函数也是控制执行频率和次数，无论用户操作多少次，这个函数能够保证固定时间执行1次

```js
// 核心思想：如果小于固定的时间内，那么函数不执行
function throttle(fn, wait) {
    var start = +new Date();;
    return function() {
        var end = +new Date();
        var args = arguments;
        if(end - start > wait) {
            fn.call(this, ...args);
            start = end;
        };
    };
};
// 可以看这2个函数的区别
document.addEventListener('mousemove', function(e){
    console.log('mousemove1', e.target);
}, false);
document.addEventListener('mousemove', throttle(function(e){
    console.log('mousemove2', e.target);
}, 500), false);
```

### 9.实现webpack里的plugin
continue

### 10.实现webpack里的loader
continue