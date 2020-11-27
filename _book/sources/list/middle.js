window.questionObj = null;

var questionObj = {
	title: "中级前端面试题",
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
			topic: "请说说你的职业规划",
			keywords: '职业规划',
			answer: "DIY",
			point: 10,
		},
	]
}

window.questionObj = questionObj;
