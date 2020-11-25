/*
  字段解析
  id - 题目的id, 唯一
  isMul - 单选/多选 暂没用到
  type -  题目选项类型, 分单/多选, 输入框, textarea等
  topic - 题目的文案
  options - 单选/多选的列表
  answer - 答案
  point - 分值
  content - 代码题
  isExecuted - 是否可用eval函数执行该结果
*/
const juniorList = [
	{
		id: 0,
		isMul: "single",
		type: "radio",
		topic: "以下代码执行的结果是",
		options: ["1", "undefined", "error"],
		answer: "1",
		point: 2,
		content: `console.log(a)
var a = 1;`,
	},
	{
		id: 1,
		isMul: "multiple",
		type: "input",
		topic: "以下代码执行的结果是",
		answer: "3",
		point: 2,
		content: `console.log(1.1|2)`,
	},
	{
		id: 2,
		isMul: "multiple",
		type: "checkbox",
		topic: "性能优化有哪些点",
		options: [
			"减少http请求",
			"文件资源压缩",
			"合理使用缓存",
			"采用滚动/滑动加载的方式",
		],
		answer: "减少http请求,文件资源压缩,合理使用缓存,采用滚动/滑动加载的方式",
		point: 2,
		content: null,
	},
	{
		id: 3,
		isMul: "multiple",
		type: "textarea",
		topic: "请实现一个方法, 打平该数组, 不得使用flat方法",
    answer: "1,2,3,4,5,6",
    point: 5,
    isExecuted: true,
    content: `var arr = [1, [2, 3], [4, [5, 6]]]; // => [1, 2, 3, 4, 5, 6]`,
	},
];

window.juniorList = juniorList;
