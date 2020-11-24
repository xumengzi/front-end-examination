const juniorList = [
	{
		id: 1,
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
		id: 2,
		isMul: "multiple",
		type: "input",
		topic: "以下代码执行的结果是",
		answer: "1",
		point: 2,
		content: `console.log(1.1|2)`,
	},
	{
		id: 3,
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
		id: 4,
		isMul: "multiple",
		type: "textarea",
		topic: "请实现数组的flat方法",
		answer: "ingore",
		point: 5,
		content: null,
	},
];

window.juniorList = juniorList;
