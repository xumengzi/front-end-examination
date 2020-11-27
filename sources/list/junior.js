window.questionObj = null;

var questionObj = {
	title: "初级前端面试题",
	questionList: [
		{
			isMul: "multiple",
			type: "input",
			topic: "以下代码执行的结果是",
			answer: "3",
			point: 2,
			content: `console.log(null == undefined)`,
		},
		{
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
			isMul: "multiple",
			type: "textarea",
			topic: "请实现一个方法, 打平该数组, 不得使用flat方法",
			answer: "1,2,3,4,5,6",
			point: 5,
			isExecuted: true,
			content: `var arr = [1, [2, 3], [4, [5, 6]]]; // => [1, 2, 3, 4, 5, 6]`,
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "事件代理的优缺点",
			answer: "DIY",
			point: 5,
		},
	]
}

window.questionObj = questionObj;
