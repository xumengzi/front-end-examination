window.questionObj = null;

var questionObj = {
	title: "高级前端面试题",
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
			content: `console.log(1.1|2)`,
		},
		{
			id: 3,
			isMul: "multiple",
			type: "textarea",
			topic: "web性能优化有哪些, 越多越好, 不少于8项",
			answer: "ignore",
			keywords: 'web性能优化',
			point: 8,
			isExecuted: true,
			content: null,
		},
		{
			id: 4,
			isMul: "multiple",
			type: "textarea",
			topic: "请详细描述浏览器/node里 Event Loop 的运行机制",
			keywords: 'event loop',
			answer: "ignore",
			point: 10,
			isExecuted: true,
			content: null,
		},
	]
}

window.questionObj = questionObj;
