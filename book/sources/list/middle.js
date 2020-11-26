window.questionObj = null;

var questionObj = {
	title: "中级前端面试题",
	questionList: [
		{
			id: 0,
			isMul: "multiple",
			type: "textarea",
			topic: "简述script标签上的defer和async标志的异同",
			answer: "ignore",
			point: 5,
			isExecuted: true,
			content: `var arr = [1, [2, 3], [4, [5, 6]]]; // => [1, 2, 3, 4, 5, 6]`,
		},
	]
}

window.questionObj = questionObj;
