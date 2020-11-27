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
		{
			isMul: "multiple",
			type: "textarea",
			topic: "cookie,session,localstorage的异同点",
			keywords: 'cookie,session,localstorage',
			answer: "DIY",
			point: 10,
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "Vue和React的生命周期",
			keywords: 'vue,react',
			answer: "DIY",
			point: 10,
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "Vue和React组件的传值方法",
			keywords: 'vue,react,传值',
			answer: "DIY",
			point: 10,
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "call和apply的异同",
			keywords: 'call,apply',
			answer: "DIY",
			point: 10,
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "写一个函数, 实现数组去重",
			keywords: '数组去重',
			answer: "1,2,3,4,5,6",
			point: 8,
			isExecuted: true,
			content: `var arr = [1, 2, 3, 3, 3, 4, 4, 5] // => [1, 2, 3, 4, 5, 6]`
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "请说说你的职业规划",
			keywords: '职业规划',
			answer: "DIY",
			point: 10,
		},
	]
}

window.questionObj = questionObj;
