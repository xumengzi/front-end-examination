const juniorList = [
  {
    id: 1,
    column: 'multiple',
    type: 'radio',
    topic: '以下代码执行的结果是',
    options: [
      1, 'undefined', 'error'
    ],
    answer: 1,
    content: `console.log(a)
var a = 1;`
  },
  {
    id: 2,
    column: 'multiple',
    type: 'input',
    topic: '以下代码执行的结果是',
    answer: 1,
    content: `console.log(1.1|2)`
  },
  {
    id: 3,
    column: 'multiple',
    type: 'checkbox',
    topic: '性能优化有哪些点',
    options: [
      '减少http请求', '文件资源压缩','合理使用缓存','采用滚动/滑动加载的方式'
    ],
    answer: 'all',
    content: null
  },
];

window.juniorList = juniorList;