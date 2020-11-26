window.questionObj = null;

var questionObj = {
	title: "初级前端面试题",
	questionList: [
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
			content: `console.log(null == undefined)`,
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
		{
			id: 4,
			isMul: "multiple",
			type: "textarea",
			topic: "请实现一个浅拷贝的函数",
			answer: "",
			point: 3,
			isExecuted: true,
			content: `var obj = { x: 1, y: 2, z: 3 }; // => { x: 1, y: 2, z: 3 }`,
		},
	]
}

window.questionObj = questionObj;
