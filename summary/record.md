### record list
##### **威盛**
1. `TS`的`Pick`知道不？知道是咋实现的么
用于构造一个类型，它是从`Type`类型里面挑了一些属性`Keys`(`Keys`是字符串字面量 或者 字符串字面量的联合类型)。
```js
interface Test {
    a: string,
    b: number,
    c: boolean
}
type Todo = Pick<Test, 'a' | 'c'>;
var obj: Todo = {
    a: '1',
    c: false
};
```

2. `element`按需加载的原理是？在`webpack`里是怎么实现的？
核心是通过`babel`的`babel-plugin-component`。具体操作过程，再`babel`转码的时候，把整个`element-ui`的引用，变为`element-ui/lib/button`具体模块的引用。这样`webpack`收集依赖`module`就不是整个`element-ui`，而是里面具体的`button`组件。

```js
// 源码
import { Button } from 'components';
// 转码
var button = require('components/lib/button')
require('components/lib/button/style.css')
```

##### **顺丰**
1. `TS`的泛型了解多少？
泛型有点像函数的传参，比如我们传入了`number`类型，那么就可以在函数里使用这个类型，也可以把这个类型当返回值类型。
```js
// 这里T代表的就是传入的类型，比如number，string等。当然也可以用其他字母来代替
function add<T>(num: T): T {
    return num;
};
add(123);
add('asd');
```

##### **作业帮**
1. `module.exports`有哪些缺点？
2. `nodejs`导出包的方式有哪些？
3. `http`请求的参数是如何传递的？
4. `vue`样式`scope`的原理？
5. 知道哪些跨端框架，比如`uniapp`，`rn`，`weex`等那些，知道它们的底层是如何设计的吗？
6. 对`web worker`和`WebAssembly`（`WASM`）吗？
7. `vue-router`的原理是什么？如果让你设计一个，你会怎么设计？
8. 浏览器的渲染原理？它是如何渲染页面的
9. `cdn`的原理是什么？
10. 如何设计一个网页版的魔方小游戏，支持旋转，滑动，放大等，并且能够判断当前这一面的颜色是否一致？

### 参考
[一文彻底学会使用web worker](https://juejin.cn/post/7139718200177983524)

##### **美的**
1. `element`了解多少（主要指源码相关，比如整体架构，表单校验等等原理）

2. 低代码知道多少？了解可视化吗？
通过配置化的低成本方式（主要有拖拽）加上少量的一些胶水代码，去满足一些应用的需求。通常B端系统发展的更加完善。
低代码的原理其实就是预置了很多原子组件，通过拖拽的所需组件到画板上进行编排，之后就是进行组件的属性设置。
最终会产生出一份`jsonSchema`或者供开发者二次开发的“源代码”，驱动用户端渲染。原理虽然很简单，但是也有一些实现难点

3. `Vue`如何做到在浏览器端、服务端渲染(`SSR`)和`Node.js`环境下使用的？
它采用的是一种“渐进式框架”的设计模式。具体来说，Vue在不同环境做出了不同的实现：
1. 浏览器端：`Vue`通过`webpack`将多个`JavaScript`文件打包成一个能在浏览器运行的文件，浏览器处理`HTML DOM`和`css`，通过`Vue`提供数据绑定，和视图更新机制，可以快速高效地更新视图。
2. 服务端渲染（`SSR`）：`Vue`通过`Vue SSR`构建工具（如`Nuxt.js`）将Vue组件编译成通用的`JavaScript`，在服务器上渲染执行，然后将渲染结果返回给浏览器。这样可以加快首屏加载速度，提高`SEO`，并能够更好的适应一些客户端不支持`JavaScript`或者关闭`JavaScript`的情况。
3. Node环境：