window.questionObj = null;

var questionObj = {
	title: "初级前端面试题",
	tips: '大题无法判断正确与否, 请自行前往确认!',
	questionList: [
		{
			isMul: "multiple",
			type: "input",
			topic: "以下代码执行的结果是",
			answer: "true",
			point: 2,
			content: `console.log(null == undefined)`,
		},
		{
			isMul: "multiple",
			type: "input",
			topic: "以下代码执行的结果是",
			answer: "object",
			point: 2,
			content: `console.log(typeof null)`,
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "js执行的方式有哪些?",
			answer: "DIY",
			point: 5,
		},
		{
			isMul: "multiple",
			type: "input",
			topic: "以下代码执行的结果是",
			answer: "[object Date]",
			point: 2,
			content: `console.log(Object.prototype.toString.call(new Date()))`,
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
			type: "input",
			topic: "请写出以下代码的执行结果",
			answer: "jack",
			point: 5,
			isExecuted: true,
			content: `var fun = function(){
	this.name = 'peter';
	return {
		name: 'jack'
	};
}

var p = new fun();
console.log(p.name)`,
		},
		{
			isMul: "multiple",
			type: "input",
			topic: "请写出以下代码的执行结果",
			answer: "peter",
			point: 5,
			isExecuted: true,
			content: `var fun = function(){
	this.name = 'peter';
	return 'jack';    
}

var p = new fun();
console.log(p.name)`,
		},
		{
			isMul: "multiple",
			type: "input",
			topic: "请写出以下代码的执行结果",
			answer: "true",
			point: 5,
			isExecuted: true,
			content: `var fun = function(){}

fun.prototype = {
	info: {
		name: 'peter',
		age: 25
	}
}

var a = new fun();
var b = new fun();

a.info.name = 'jack';
b.info.name = 'tom';
console.log(a.info.name === b.info.name);`,
		},
		{
			isMul: "multiple",
			type: "input",
			topic: "请写出以下代码的执行结果",
			answer: "false",
			point: 5,
			isExecuted: true,
			content: `var fun = function(){}

fun.prototype = {    
	name: 'peter',    
	age: 25    
}

var a = new fun();
var b = new fun();

a.name = 'jack';
b.name = 'tom';
console.log(a.name === b.name);`,
		},
		{
			isMul: "multiple",
			type: "input",
			topic: "请写出以下代码的执行结果",
			answer: "false",
			point: 5,
			isExecuted: true,
			content: `var fun = function(){
	this.info = {
		name: 'peter',
		age: 25
	}
}

fun.prototype = {
	info : {
		name : 'peter',
		age : 25
	}
}

var a = new fun();
var b = new fun();

a.info.name = 'jack';
b.info.name = 'tom';
console.log(a.info.name === b.info.name);`,
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
			topic: "get和post的区别是什么",
			answer: "DIY",
			point: 5,
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "事件代理的原理是什么",
			answer: "DIY",
			point: 5,
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "事件代理有哪些优缺点",
			answer: "DIY",
			point: 5,
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
			topic: "cookie,session,localstorage的异同点",
			keywords: 'cookie,session,localstorage',
			answer: "DIY",
			point: 10,
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "前端安全了解多少? 比如XSS, CROS",
			keywords: 'XSS, CROS',
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
			topic: "请说说你的职业规划",
			keywords: '职业规划',
			answer: "DIY",
			point: 10,
		},
	]
}

window.questionObj = questionObj;
