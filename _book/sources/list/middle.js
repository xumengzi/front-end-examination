window.questionObj = null;

var questionObj = {
	title: "中级前端面试题",
	tips: '大题无法判断正确与否, 请自行前往确认!',
	questionList: [
		{
			isMul: "multiple",
			type: "textarea",
			topic: "简述以下3段script标签所产生的效果和影响",
			answer: "DIY",
			point: 5,
			content: `<script src="a.js"></script>
<script defer src="b.js"></script>
<script async src="c.js"></script>`,
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "new操作符的原理,试着实现这个函数",
			keywords: 'new',
			answer: "DIY",
			point: 8,
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "简单手写一个ajax",
			keywords: 'ajax',
			answer: "DIY",
			point: 8,
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "什么是CDN",
			keywords: 'cdn',
			answer: "DIY",
			point: 8,
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "重绘和重排的异同点, 哪个更耗性能",
			keywords: '重绘,重排',
			answer: "DIY",
			point: 8,
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "position有哪些属性, sticky用过吗?",
			keywords: 'relative,sticky,absolute',
			answer: "DIY",
			point: 8,
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "css里的calc用过吗",
			keywords: 'css,calc',
			answer: "DIY",
			point: 8,
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "require和import的异同",
			keywords: 'require,import',
			answer: "DIY",
			point: 8,
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "请实现一个深拷贝函数",
			keywords: '深拷贝',
			answer: "DIY",
			point: 8,
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "写一个函数, 实现十进制数转换成二进制",
			keywords: '二进制,十进制',
			answer: "1010",
			point: 8,
			isExecuted: true,
			content: `var num = 10; // => 1010`
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "请实现一个能将金钱格式化的函数",
			keywords: '二进制,十进制',
			answer: "123,456",
			point: 8,
			isExecuted: true,
			content: `var money = 123456 // => 123,456`
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "一个XHR接口耗时5s, 如何去优化?",
			keywords: 'xhr,ttfb,waiting',
			answer: "123,456",
			point: 8,
			isExecuted: true,
			content: `var money = 123456 // => 123,456`
		},
		{
			isMul: "multiple",
			type: "textarea",
			topic: "0.1加0.2等于0.3吗? 如何让他们相等",
			keywords: '浮点数',
			answer: "0.3",
			point: 8,
			isExecuted: true,
			content: `var money = 123456 // => 123,456`
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
