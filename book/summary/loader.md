### loader
`loader`主要用于对模块的源代码进行转换。`loader`可以在我们`import`模块时预处理文件。因此，`loader`类似其他编译工具里的任务（`task`），并提供了处理前端构建步骤的得力方法。
`loader`可以将文件从不同类型转换成浏览器识别的文件，比如把`TypeScript`转换成`JavaScript`。

#### loader原理
`loader`是导出为一个函数的`node`模块。该函数在`loader`转换资源的时候调用。给定的函数将调用`Loader API`，并通过`this`上下文访问。
一个简单版的`loader`包括以下一点东西。`loader`有许多配置，方法，接口，具体参见[loader](https://www.webpackjs.com/api/loaders/)

```js
// 提示文件里哪些地方用了var变量的loader，可以提示在终端也可以输出到xxx.txt文件里
const path = require('path');
const loaderUtils = require("loader-utils");

const defaultTypeNum = {
    'error': "emitError",
    'warn': "emitWarning",
    'file': "emitFile"
};
function filterNotes(source) {
    // 这里用来过滤/* */这样的注释，因为这里面的var不用提示
    var rangeNote = /\s*(\/\*)[^\*\/]*(\*\/\s*)/g;
    return source.replace(rangeNote, '');
};

const transfor2Let = (source, self, newOptions) => {
    const { outputType, isIgnoreNotesVars } = newOptions;
    // 是否要过滤注释里的var变量
    const newStr = isIgnoreNotesVars ? filterNotes(source) : source;
    const resArr =  newStr.split('\n');
    let result = '';

    // 包含var变量的正则
    const target = /\s?var\s+/;

    resArr.forEach((str, index) => {
        var isNote = /\s*\/\//; // 如果是注释里的var，则忽略
        if (isNote.test(str)) {
            return
        }
        if(str && target.test(str)) {
            result += `第【${index+1}】行使用了var变量，请修改为let或者const\n`;
        }
    })

    if (result) {
        // 输出到终端
        if(outputType === 'file'){
            // 文件路径
            const finalPath = self.resource;
            // 找到文件的名字，比如xx/yy/zz.js的zz，并拼成zz.txt
            const finalName = path.basename(finalPath, path.extname(finalPath));
            self.emitFile(finalName + '.txt', '/*\n' + result + '*/')
        } else {
            self[defaultTypeNum[outputType]](new Error(result))
        }
    }
    return source;
}

function loader(source) {
    const options = loaderUtils.getOptions(this);

    const newOptions = Object.assign({}, {
        outputType: 'warn',
        isIgnoreNotesVars: true,
    }, options);

    const newSource = transfor2Let(source, this, newOptions);
    return newSource;
}

module.exports = loader;
```

在`webpack.config.js`里配置了之后
```js
module.exports = {
    module: {
        rule: [
            {
                test: /\.js$/,
                use: [{
                    loader: './loader.js',
                    options: {
                        outputType: 'warn', // 可选error，warn，file
                        isIgnoreNotesVars: false // boolean
                    }
                }],
            },
        ]
    }
}
```
使用时会显示如下内容（根据配置不同展示不同的效果）
```
WARNING in ./index.js
Module Warning (from ./loader.js):
第【2】行使用了var变量，请修改为let或者const
第【3】行使用了var变量，请修改为let或者const
第【10】行使用了var变量，请修改为let或者const
第【11】行使用了var变量，请修改为let或者const

WARNING in ./test.js
Module Warning (from ./loader.js):
第【6】行使用了var变量，请修改为let或者const
第【7】行使用了var变量，请修改为let或者const

 @ ./index.js 1:0-24
```