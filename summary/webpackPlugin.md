### 自定义webpack插件
插件向第三方开发者提供了webpack引擎中完整的能力。使用阶段式的构建回调，开发者可以在webpack构建流程中引入自定义的行。
创建插件比创建loader更高级，因为你需要理解webpack底层的特性来处理相应的钩子。

#### 1.创建插件
webpack插件由以下组成：
1. 一个JavaScript命名函数或者JavaScript类
2. 在插件函数的prototype上定义一个apply方法
3. 指定一个绑定到webpack自身的事件钩子
4. 处理webpack内部实例的特定数据
5. 功能完成后调用webpack提供的回调

代码如下：
```js
// JS类
class MyWebpackPlugin {
    // 必须包含一个apply方法，参数为compiler对象
    apply(compiler) {
        // 指定一个挂载到webpack自身的事件钩子
        compiler.hooks.emit.tapAsync(
            'MyWebpackPlugin',
            // 单次构建的compilation对象以及回调函数
            (compilation, callback) => {
                console.log('it is a example plugin');
                // 用webpack提供的插件api处理构建过程
                compilation.addModule();
                callback();
            }
        )
    }
}
```

#### 2.基本插件架构
插件是由具有apply方法的prototype对象所实例化而来。这个apply方法在安装插件时，会被webpack compiler调用一次。
apply方法接收一个webpack compiler对象的引用，从而可以在回调函数中访问compiler对象。一个插件结构如下：
```js
class ExamplePlugin {
    apply(compiler) {
        compiler.hooks.done.tap(
            'ExamplePlugin',
            (stats => {
                console.log('hello, world');
            })
        )
    }
}
module.exports = ExamplePlugin;
```

然后，要安装这个插件，只需要在webpack的配置中引入，在Plugins数组内，添加这个插件的实例即可
```js
const ExamplePlugin = require('ExamplePlugin');
module.exports = {
    // 其他配置
    plugins: [
        new ExamplePlugin({options})
    ]
}
```

另外，可以使用[schma-utils](https://github.com/webpack/schema-utils)来校验传入插件的选项，比如
```js
import { validate } from 'schma-utils';

const options = {
    type: 'object',
    properties: {
        test: {
            type: 'string'
        }
    }
};

export default class ExamplePlugin {
    constructor(options = {}) {
        validate(schma, options, {
            name: 'hello, world',
            bashDataPath: 'options',
        })
    }

    apply(compiler) {}
}
```

#### 3.compiler和compilation
在插件开发过程中有2个非常重要的资源就是compiler和compilation对象。理解它们是深入Plugin重要的一步

```js
export default class ExamplePlugin {
    apply(compiler) {
        // 指定一个挂载到compilation的钩子函数，回调函数的参数就是compilation
        compiler.hooks.compilation.tap(
            'ExamplePlugin',
            (compilation) => {
                // 现在可以通过compilation对象绑定各种钩子函数了
                compilation.hooks.optimize.tap(
                    'ExamplePlugin',
                    () => {
                        console.log('资源已经优化完毕');
                    }
                )
            }
        )
    }
}
```

更多关于compiler和compilation的钩子函数，请查看[Plugins API](https://www.webpackjs.com/api/plugins/)

### 异步编译插件
有些插件钩子是异步的。我们可以像同步一样用tap方法来绑定，也可以使用tapAsync或者tapPromise这2个异步方法来绑定。

#### tapAsync
当我们使用tapAsync方法来绑定插件时，**必须**调用函数的最后一个参数callback指定的回调函数，否则webpack编译会出问题

```js
export default class ExamplePlugin {
    apply(compiler) {
        // 指定一个挂载到compilation的钩子函数，回调函数的参数就是compilation
        compiler.hooks.compilation.tapAsync(
            'ExamplePlugin',
            (compilation, callback) => {
                setTimeout(()=>{
                    // 模拟异步操作
                    // 完毕后调用callback函数，继续执行后续代码
                    callback()
                }, 2000)
            }
        )
    }
}
```

#### tapPromise
当我们用tapPromise方法来绑定插件时，**必须**返回一个Promise，异步任务完成后resolve。

```js
export default class ExamplePlugin {
    apply(compiler) {
        // 指定一个挂载到compilation的钩子函数，回调函数的参数就是compilation
        compiler.hooks.compilation.tapPromise(
            'ExamplePlugin',
            (compilation) => {
                return new Promise((resolve, reject) => {
                    setTimeout(()=>{
                        // 模拟异步操作
                        // 完毕后调用callback函数，继续执行后续代码
                        resolve()
                    }, 2000)
                })
            }
        )
    }
}
```