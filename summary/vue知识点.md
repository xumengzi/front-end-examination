### `vue`的一些重要知识点

#### 从`vue`源码里学到的一些知识
1. 函数科里化：一个函数原本有多个参数，但是只传入一个参数，生成一个新函数，由新函数接收剩下的参数来运行
2. 偏函数：一个函数原本有多个参数，但是只传入部分参数，生成一个新函数，由新函数接收剩下的参数来运行
3. 高阶函数：一个函数的参数是一个函数，该函数对参数进行加工从而得到了一个新函数，这个加工过后的函数就是高阶函数

#### `vue`响应式系统
`vue`初始化的时候，会用`Object.defineProperty`函数给data中每一个属性添加`getter，setter`，同时创建`dep`和`watcher`进行
依赖收集和派发更新，最后通过`diff`算法对比新老`vnode`差异，通过`patch`及时更新`DOM`

#### `vue`的数据频繁变化，为何只会更新一次
1. 检测到数据变化
2. 开启一个队列
3. 再同一事件循环里缓冲所有的数据改变
4. 如果同一个`watcher`被多次触发，那么只会被推入队列一次，所以就只会执行一次

#### `Object.defineProperty`的缺陷
数组的`length`属性被初始化`configurable:false`，就变成不可枚举了，然后就没法通过get/set来监听`length`了。
`vue`2里就重写了7个能够改变原数组的方式来实现监听
而普通对象还是使用`Object.defineProperty`添加`set/get`来监听

#### `vue`.nextTick的原理
在下次`DOM`更新循环结束之后执行延迟回调。再修改数据之后立即使用这个方法，获取更新后的`DOM`
源码实现是通过微/宏任务来实现的。`Promise > Mutation Observer > setImmediate > setTimeout`

#### `vue diff` 算法
1. 只对比父节点相同的新旧节点（比较的是`vNode`），时间复杂度是`O(n)`
2. 在`diff`的过程中，循环从两边向中间靠拢

##### 新旧节点对比过程
1. 先找到不需要移动的相同节点，借助`key`值找到可复用的节点，这是消耗最小的
2. 再找相同但是需要移动的节点，消耗第二小
3. 最后找不到，才会去新建删除节点，保底处理

注意：新旧节点对比过程，不会对这两棵`Vnode`树进行修改，而是以比较的结果直接对 真实`DOM` 进行修改
`Vue`的`patch`是即时的，并不是打包所有修改最后一起操作`DOM`（`React`则是将更新放入队列后集中处理）
具体简介：[0.5 virtualDom和diff算法](/summary/virtualDom和diff算法.md)

#### `vue`渲染过程
1. 调用`compile`函数，生成`render`函数字符串，编译过程如下：
   1. `parse`函数使用大量的正则表达式对`template`字符串进行解析，将标签，指令，属性等转换为抽象语法树`AST`。模板到`AST`非常消耗性能
   2. `optimise`函数遍历`AST`，找到其中的一些静态节点并进行标记，方便在页面重新渲染的时候进行`diff`比较，直接跳过这一节点
   3. `generate`将最终的的`AST`转换为`render`函数字符串
2. 调用`new watcher`函数，监听数据的变化，当数据发生变化时，`render`函数执行生成`vNode`对象
3. 调用`patch`方法，对比新旧`vNode`对象，通过`DOM diff`算法来添加，修改删除真正的`DOM`元素

#### `vue`生命周期
见官网

#### `vue`的循环中，key的作用是什么
`key`是给每一个`vNode`的唯一`Id`，依靠`key`，我们的`diff`操作能够更准确，更迅速。

更准确：因为带`key`就不是就地复用了，再`sameNode`函数a.key === b.key对比中可以避免就地复用的情况。所以会更加准确，如果不加key，乎导致之前的节点保留下来，会产生一系列`bug`
更迅速：`key`的唯一性可以被`map`数据结构充分利用，相比于遍历查找的时间复杂度`O(n)`，`map`的时间复杂度仅仅为`O(1)`。源码如下：
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

#### `vue-router`路由模式
默认值是：`hash`（浏览器环境）| `abstract（node）`
可选值：`hash` | `history` | `abstract`
配置路由模式：
1. `hash`使用URL `hash`来作为路由。支持所有浏览器，包括不支持`HTML5 History Api`的浏览器
2. `history`依赖`HTML5 History Api`和服务器配置
3. `abstract`支持所有`JavaScript`运行环境，如`nodejs`服务端。如果发现没有浏览器`Api`，路由会强制进入这个模式

#### `vue` 响应式`defineReactive`的原理
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

#### `vue`响应式reactify实现
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

#### `vue`中访问`data`属性为啥不需要带`data`
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

#### 为什么`this.$nextTick`里能获取到更新后的`dom`
调用`this.$nextTick`方法其实就是调用`vue`里的`nextTick`函数，再异步队列里执行回调函数。根据先进先出的原则，修改`data`触发的更新异步队列会先执行，执行完后`dom`会更新渲染。接下来再执行`this.$nextTick`里的回调函数，所以就能获取更新后的`dom`元素了。
```js
// 我们使用 this.$nextTick 其实就是调用 nextTick 方法
Vue.prototype.$nextTick = function (fn: Function) {
  return nextTick(fn, this);
};
```
总结`vue`异步更新原理
1. 修改`vue`里的`data`时，就会触发所有和这个`data`相关的`watcher`进行更新
2. 首先，会将所有的`watcher`加入到队列`Queue`
3. 然后，调用`nextTick`方法，执行异步任务
4. 再异步任务的回调中，对`Queue`中的`watcher`进行排序，然后执行`DOM`更新

#### 为何`data`是一个函数而不是一个对象
因为`JavaScript`里对象是引用类型的数据，当多个实例引用同一个对象的时候，只要一个实例对数据进行了操作，那么其他实例中的数据也会发生变化。而在`vue`中，这显然是不可行的，我们需要组件有自己单独的数据。所以数据必须是一个函数，而数据以函数返回值的形式定义，这样我们组件就有了自己的数据源，而不是共用的了。

### `vue2`中数组没有及时更新的解决办法
1. 可以用`this.$set`去设置
2. 使用`push`,`pop`,`shift`等数组方法去更新数组
3. 使用官方的`this.$forceUpdate()`去更新
4. 可以用`hack`的写法，比如`[...Array]`，`JSON.parse(JSON.stringify)`

### 请写一个`mini`版本的`vue router`

```js
const Vue; // 先定义一个Vue
class MyVueRouter {
  constructor(options) {
    this.$options = options;
    this.routeMap = {}; // 存储路由信息
    // 路由响应式绑定
    this.app = new Vue({
      data: {
        current: '/'
      }
    })
  }
  init() {
    this.bindEvents(); // 监听url变化，绑定事件
    this.createRouteMap(this.$options); // 解析路由配置
    this.initComponent(); // 实现router-view
  }
  bindEvents() {
    // 监听刚打开页面的时候
    window.addEventListener('load', this.onHashChange.bind(this));
    // 监听URL变化
    window.addEventListener('hashchange', this.onHashChange.bind(this));
  }
  onHashChange() {
    /*
    比如这个网站：https://xumeng.life/#test
    window.location.hash返回的是#test
    slice接受2个参数start和end，传1表示把test获取到
    */
    this.app.current = window.location.hash.slice(1) || '/';
  }
  createRouteMap(options) {
    options.routes.forEach(item => {
      this.routeMap[item.path] = item.component;
    })
  }
  initComponent() {
    Vue.component('router-link', {
      props: {
        to: String
      },
      render(h) {
        /*
          h函数全称hyperscript，意思是能够创建html的js，许多虚拟dom都会用这个来实现，约定俗成的
          比如你可以这样使用：
          h('div')
          h('div', { id: 'foo' })

          // attribute 和 property 都能在 prop 中书写
          // Vue 会自动将它们分配到正确的位置
          h('div', { class: 'bar', innerHTML: 'hello' })

          // 像 `.prop` 和 `.attr` 这样的的属性修饰符
          // 可以分别通过 `.` 和 `^` 前缀来添加
          h('div', { '.name': 'some-name', '^width': '100' })

          // 类与样式可以像在模板中一样
          // 用数组或对象的形式书写
          h('div', { class: [foo, { bar }], style: { color: 'red' } })

          // 事件监听器应以 onXxx 的形式书写
          h('div', { onClick: () => {} })
        */
        return h('a', {
          attrs: {
            href: '#' + this.to
          }}, 
          [this.$slots.default])
      }
    });
    Vue.component('router-view', {
      render: h => {
        const com = this.routeMap[this.app.current];
        return h(com);
      }
    })
  }
};

const router = new MyVueRouter({
  routes: [
    {
      path: '/',
      name: 'index',
      component: a
    },
    {
      path: '/',
      name: 'about',
      component: b
    }
  ]
});
```