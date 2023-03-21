### 自定义webpack插件
插件向第三方开发者提供了`webpack`引擎中完整的能力。使用阶段式的构建回调，开发者可以在webpack构建流程中引入自定义的行。
创建插件比创建`loader`更高级，因为你需要理解`webpack`底层的特性来处理相应的钩子。

#### 1.创建插件
`webpack`插件由以下组成：
1. 一个`JavaScript`命名函数或者`JavaScript`类
2. 在插件函数的`prototype`上定义一个`apply`方法
3. 指定一个绑定到`webpack`自身的事件钩子
4. 处理`webpack`内部实例的特定数据
5. 功能完成后调用`webpack`提供的回调

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
插件是由具有`apply`方法的`prototype`对象所实例化而来。这个`apply`方法在安装插件时，会被`webpack compiler`调用一次。
`apply`方法接收一个`webpack compiler`对象的引用，从而可以在回调函数中访问`compiler`对象。一个插件结构如下：
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

然后，要安装这个插件，只需要在`webpack`的配置中引入，在`Plugins`数组内，添加这个插件的实例即可
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
在插件开发过程中有2个非常重要的资源就是`compiler`和`compilation`对象。理解它们是深入`Plugin`重要的一步

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

更多关于`compiler`和`compilation`的钩子函数，请查看[Plugins API](https://www.webpackjs.com/api/plugins/)

### 异步编译插件
有些插件钩子是异步的。我们可以像同步一样用`tap`方法来绑定，也可以使用`tapAsync`或者`tapPromise`这2个异步方法来绑定。

#### tapAsync
当我们使用`tapAsync`方法来绑定插件时，**必须**调用函数的最后一个参数`callback`指定的回调函数，否则`webpack`编译会出问题

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
当我们用`tapPromise`方法来绑定插件时，**必须**返回一个`Promise`，异步任务完成后调用`resolve`方法。

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

### 完整例子
看到这里，我们对`webpack`的`compiler`以及每个独立的`compilation`有了深入理解，那么我们可以在这期间做很多事情。我们可以格式化已有的文件，创建衍生的文件，或者生成全新的生成文件等。
让我们来写一个简单的插件[官方示例](https://www.webpackjs.com/contribute/writing-a-plugin/#example)，生成一个叫做`assets.md`的新文件，文件内容就是所有构建生成文件的列表。这个插件大概长这样：

目前发现官方示例已经跑不起来了，各种报错：
1. `compilation`里已经没有`webpack`了
2. `RawSource`需要在`webpack-sources`里引入
3. `compilation`上也没有`processAssets`的`hooks`了，尽管官网上有，但是目前代码看不到了。另外我也发现`afterProcessAssets`也没有了

具体可以参见：
[compiler hooks](https://www.webpackjs.com/api/compiler-hooks/),
[compilation对象](https://www.webpackjs.com/api/compilation-object/#compilation-object-methods),
[compilation hooks](https://www.webpackjs.com/api/compilation-hooks/)

```js
const RawSource = require('webpack-sources').RawSource;

// 这是一个webpack的插件
class FileListPlugin {
    // 这里去处理插件传进来的一些参数，并和默认参数进行合并，生成统一的插件参数
    constructor(params) {
        // 默认的文件名就叫assets.md
        const defaultOptions = {
            outputName: 'assets.md',
        }
        this.options = Object.assign({}, defaultOptions, params);
    }
    /*
        apply函数是插件的灵魂，必须存在
        入参是compiler对象，这个对象方法非常多，提供了一些钩子函数，方便我们在webpack各个生命周期里做很多事情
        */
    apply(compiler) {
        const pluginName = FileListPlugin.name;

        /*
            绑定到thisCompilation钩子
            这样可以进一步绑定到Compilation过程更早期的阶段
            */
        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            // 绑定到资源处理流水线（assets processing pipeline）
            compilation.hooks.optimizeAssets.tap(
                {
                    name: pluginName
                },
                /*
                    assets是一个包含compilation中所有资源(assets)的对象。
                    该对象的键是自愿的路径
                    值是资源的源码
                    */ 
                (assets) => {
                    // 遍历所有资源，生成md文件
                    const files = Object.keys(assets)
                                    .map(fileName => '1. ' + fileName)
                                    .join('\r\n');
                    const content = `## here is ${pluginName}.md\r\n\r\n` + files;
                    /*
                        向compilation添加新的资源
                        这样webpack就会自动生成并输出到output目录
                        */
                    compilation.emitAsset(
                        this.options.outputName,
                        new RawSource(content)
                    )})
                    // compilation对象上完成的方法，参数是一个函数
                    compilation.finish(() => {
                        console.log("ok, it's finished!!!");
                    })
        })
    }
};
module.exports = FileListPlugin;
```

在webpack.config.js引入之后，进行编译，会发现生成了一个assets.md文件，里面的内容是：

```md
## here is FileListPlugin.md

1. images/1.png
1. 087ec4ede1fe38a9e4838bee53b7dc1a.css
1. index.js
```