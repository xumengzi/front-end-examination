### DOM tree

一个`HTML`文档的骨架就是标签（`tags`）。
根据文档对象模型（`Document Object Model`，也叫`DOM`），每个`HTML`的标签都是一个对象。嵌套的标签就是标签里的`children`，同样标签里的文本也是一个对象。
所有的这些对象都可以用`JavaScript`来访问，我们可以用它来修改页面。
举例，`document.body`就是代表`body`标签的一个对象。下面的代码将会使页面变成红色，3s 后恢复原状

```js
// make the background red
document.body.style.background = "red";
// return back
setTimeout(() => (document.body.style.background = ""), 3000);
```

该代码使用`style.background`来改变`document.body`的背景色，同样我们也有很多其他属性，例如：

- `innerHTML` - 节点的`html`
- `offsetWidth` - 节点的宽度（像素）
- 等等

我们马上就会学会很多操作`DOM`的方法，但是首先我们需要了解一下它的结构。

#### 一段`DOM`的例子

让我们以下面这个简单例子为例

```html
<!DOCTYPE html>
<html>
  <head>
    <title>About elk</title>
  </head>
  <body>
    The truth about elk.
  </body>
</html>
```

`DOM`用标签的树结构来表示`HTML`，它大概是这个样子：

> 我们可以在[live-dom-viewer](https://software.hixie.ch/utilities/js/live-dom-viewer/)里，实时查看`DOM`节点

```
├── HTML
│   ├── HEAD
│   │   ├── #text ↵␣␣
│   │   ├── TITLE
│   │   │   ├── #text About elk
│   │   └── #text ↵
│   ├── #text ↵
│   ├── BODY
│   │   ├── #text ↵␣␣ The truth about elk.↵
```

每个树节点都是一个对象。
标签是元素节点（或者仅仅是一个元素），然后形成了一个树结构：`<html>`是根节点，接着是`<head>`，然后是`<body>`和它的子节点，等等。
元素的文本形成了文本节点，用`#text`来标记，一个文本节点只会包含一个字符串，它不会有子节点，总是树的一片叶子。
例如`<title>`标签的文本是`About elk`。
需要注意文本节点里的特殊字符：

- 换行符：↵（在`JavaScript`里就是`\n`）
- 空格：␣

空格和换行也是合法的字符，像字符和数字。他们一起组成了文本节点变成了`DOM`的一部分。所以在例子中，在`<title>`标签前有几个空格，接着空格变成了一个`#text`节点（它只包含换行和一些空格符）。
只有两个顶级标签，除了：

- 在`<head>`标签前的换行，空格符因为一些历史原因会被忽略
- 如果我们把元素放到`</body>`之外，那么它会自动移动到`body`标签里，最后，在 HTML 规范里所有的元素都必须在`<body>`里。所以在`</body>`外没有也没有空格

在某些情况下，一切都很简单——如果文档中有空格（就像任何字符一样），那么它们就会成为`DOM`中的文本节点，如果我们删除它们，那么就没有了。
这里是没有任何空格的文本节点例子：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>About elk</title>
  </head>
  <body>
    The truth about elk.
  </body>
</html>
```

对应的树节点如下：

```
├── HTML
│   ├── HEAD
│   │   ├── TITLE
│   │   │   ├── #text About elk
│   ├── BODY
│   │   ├── #text The truth about elk.
```

#### 自我纠正

当生成`DOM`的时候，如果浏览器遇到格式错误的`HTML`，会自动纠正它。
例如，顶级标签总是 `<html>`，即使它不存在文档里，也会存在`DOM`中，因为浏览器会创建这个标签，同样也适用于`<body>`。
假如一个`HTML`文件只有一个单词`hello`，浏览器渲染的时候会把它包裹在`html`和`body`里，也会加一个`head`标签，最后`DOM`会是这个样子：

```
├── HTML
│   ├── HEAD
│   ├── BODY
│   │   ├── #text hello
```

在生成`DOM`的时候，浏览器会自动处理文档的错误，比如关闭标签等等
假如有这一个例子：

```html
<p>
  Hello
  <li>Mom</li>
  <li>and</li>
  <li>Dad</li>
</p>
```

浏览器读取到丢失的标签，会自动补齐并修复好。

```
├── HTML
│   ├── HEAD
│   ├── BODY
│   │   ├── P
│   │   │    ├── #text Hello
│   │   ├── LI
│   │   │    ├── #text Mom
│   │   ├── LI
│   │   │    ├── #text and
│   │   ├── LI
│   │   │    ├── #text Dad
```

#### 其他节点类型

在元素节点和文本节点外还有一些其他的节点类型。比如：注释

```html
<!DOCTYPE html>
<html>
  <body>
    The truth about elk.
    <ol>
      <li>An elk is a smart</li>
      <!-- comment here -->
      <li>...and cunning animal!</li>
    </ol>
  </body>
</html>
```

对应的树结构如下：

```
├── HTML
│   ├── HEAD
│   │   ├── #text ↵␣␣
│   │   ├── TITLE
│   │   │   ├── #text About elk
│   │   └── #text ↵
│   ├── #text ↵
│   ├── BODY
│   │   ├── #text ↵␣␣ The truth about elk.↵
│   │   ├── OL
│   │   ├── #text ↵␣␣
│   │   │   ├── LI
│   │   │   │   ├── #text An elk is a smart
│   │   │   ├── #text ↵␣␣
│   │   │   ├── #comment comment here
│   │   │   ├── #text ↵␣␣
│   │   │   ├── LI
│   │   │   │   ├── #text ..and cunning animal!
│   │   │   ├── #text ↵␣␣
│   │   ├── #text ↵␣␣
```

我们可以看到在 2 个文本节点中间有了一个新的树节点类型-注释节点（`comment node`），用`#comment`来表示。
我们可能会纳闷，为啥注释也被加到了`DOM`里？它是无论如何也不会影响到渲染的。但是有一个规则，如果`HTML`里面有东西，那么它也必须在`DOM`树里。

**`HTML`里的所有内容，即使是注释，都会变成`DOM`的一部分**

甚至`HTML`页面开头的`<!DOCTYPE...>`指令，也是`DOM`节点。它在`DOM`树里的`<html>`标签前面。很少有人知道这个点，我们碰不到这个节点，我们甚至没有绘制到页面里，但是它就是存在的。
表示整个文档的文档对象在形式上也是一个`DOM`节点。

总共有[12 个节点类型](https://dom.spec.whatwg.org/#node)，通常的我们只用到其中 4 个：

1. `document-DOM`的入口
2. 元素节点-`HTML`标签，构建树的模块
3. 文本节点-用来包裹文本
4. 注释-我们会放一些关键信息，它不会显示在页面上，但是`JavaScript`可以读取到它

#### 总结

`HTML/XML`文档在浏览器内均被表示为`DOM`树。

- 标签（`tag`）成为元素节点，并形成文档结构。
- 文本（`text`）成为文本节点。
- ……等，`HTML`中的所有东西在`DOM`中都有它的位置，甚至对注释也是如此。

`DOM`节点具有允许我们在它们之间移动、修改它们、在页面中移动等的属性和方法。 我们将在下一章深入探讨它们。
