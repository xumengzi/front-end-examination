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
	]
}

window.questionObj = questionObj;
