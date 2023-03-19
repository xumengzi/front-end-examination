### vue的一些重要知识点

#### 从vue源码里学到的一些知识
1. 函数科里化：一个函数原本有多个参数，但是只传入一个参数，生成一个新函数，由新函数接收剩下的参数来运行
2. 偏函数：一个函数原本有多个参数，但是只传入部分参数，生成一个新函数，由新函数接收剩下的参数来运行
3. 高阶函数：一个函数的参数是一个函数，该函数对参数进行加工从而得到了一个新函数，这个加工过后的函数就是高阶函数

#### vue响应式系统
vue初始化的时候，会用Object.defineProperty函数给data中每一个属性添加getter，setter，同时创建dep和watcher进行
依赖收集和派发更新，最后通过diff算法对比新老vnode差异，通过patch及时更新DOM

#### vue的数据频繁变化，为何只会更新一次
1. 检测到数据变化
2. 开启一个队列
3. 再同一事件循环里缓冲所有的数据改变
4. 如果同一个watcher被多次触发，那么只会被推入队列一次，所以就只会执行一次

#### Object.defineProperty的缺陷
数组的length属性被初始化configurable:false，就变成不可枚举了，然后就没法通过get/set来监听length了。
vue2里就重写了7个能够改变原数组的方式来实现监听
而普通对象还是使用Object.defineProperty添加set/get来监听

#### vue.nextTick的原理
在下次DOM更新循环结束之后执行延迟回调。再修改数据之后立即使用这个方法，获取更新后的DOM
源码实现是通过微/宏任务来实现的。Promise > Mutation Observer > setImmediate > setTimeout

#### vue diff 算法
1. 只对比父节点相同的新旧节点（比较的是vNode），时间复杂度是O(n)
2. 在diff的过程中，循环从两边向中间靠拢

##### 新旧节点对比过程
1. 先找到不需要移动的相同节点，借助key值找到可复用的节点，这是消耗最小的
2. 再找相同但是需要移动的节点，消耗第二小
3. 最后找不到，才会去新建删除节点，保底处理

注意：新旧节点对比过程，不会对这两棵Vnode树进行修改，而是以比较的结果直接对 真实DOM 进行修改
Vue的patch是即时的，并不是打包所有修改最后一起操作DOM（React则是将更新放入队列后集中处理）
[vue-diff详解](https://segmentfault.com/a/1190000020663531)

#### vue渲染过程
1. 调用compile函数，生成render函数字符串，编译过程如下：
   1. parse函数使用大量的正则表达式对template字符串进行解析，将标签，指令，属性等转换为抽象语法树AST。模板到AST非常消耗性能
   2. optimise函数遍历AST，找到其中的一些静态节点并进行标记，方便在页面重新渲染的时候进行diff比较，直接跳过这一节点
   3. generate将最终的的AST转换为render函数字符串
2. 调用new watcher函数，监听数据的变化，当数据发生变化时，render函数执行生成vNode对象
3. 调用patch方法，对比新旧vNode对象，通过DOM diff算法来添加，修改删除真正的DOM元素

#### vue生命周期
见管网

#### vue的循环中，key的作用是什么
key是给每一个vNode的唯一Id，依靠key，我们的diff操作能够更准确，更迅速。

更准确：因为带key就不是就地复用了，再sameNode函数a.key === b.key对比中可以避免就地复用的情况。所以会更加准确，如果不加key，乎导致之前的节点保留下来，会产生一系列bug
更迅速：key的唯一性可以被map数据结构充分利用，相比于遍历查找的时间复杂度O(n)，map的时间复杂度仅仅为O(1)。源码如下：
```js
function createKeyToOldIdx(children, beginIdx, endIdx) {
  let i, key;
  const map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}
```

#### vue-router路由模式
默认值是：hash（浏览器环境）| abstract（node）
可选值：hash | history | abstract
配置路由模式：
1. hash使用URL hash来作为路由。支持所有浏览器，包括不支持HTML5 History Api的浏览器
2. history依赖HTML5 History Api和服务器配置
3. abstract支持所有JavaScript运行环境，如nodejs服务端。如果发现没有浏览器Api，路由会强制进入这个模式

#### vue 响应式defineReactive的原理
```js
// 简化后的版本
function defineReactive(target, key, value, enumerable) {
  // 折中处理后, this 就是 Vue 实例
  let that = this;

  // 函数内部就是一个局部作用域, 这个 value 就只在函数内使用的变量 ( 闭包 )
  if (typeof value === "object" && value != null && !Array.isArray(value)) {
    // 是非数组的引用类型
    reactify(value); // 递归
  }

  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: !!enumerable,

    get() {
      console.log(`读取 ${key} 属性`); // 额外
      return value;
    },
    set(newVal) {
      console.log(`设置 ${key} 属性为: ${newVal}`); // 额外

      value = reactify(newVal);
    },
  });
}
```

#### vue响应式reactify实现
```js
// 将对象 o 响应式化
function reactify(o, vm) {
  let keys = Object.keys(o);

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]; // 属性名
    let value = o[key];
    if (Array.isArray(value)) {
      // 数组
      value.__proto__ = array_methods; // 数组就响应式了
      for (let j = 0; j < value.length; j++) {
        reactify(value[j], vm); // 递归
      }
    } else {
      // 对象或值类型
      defineReactive.call(vm, o, key, value, true);
    }
  }
}
```

#### vue中访问data属性为啥不需要带data
```js
/** 将某一个对象的属性访问映射到对象的某一个属性成员上 */
function proxy(target, prop, key) {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get() {
      return target[prop][key];
    },
    set(newVal) {
      target[prop][key] = newVal;
    },
  });
}

```