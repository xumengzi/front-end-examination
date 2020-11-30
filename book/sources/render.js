(function (w) {
	// 生成考试函数
	var dom = document.querySelector("#chapter-content");
	var questionList = questionObj.questionList;
	var title = questionObj.title;
	function render() {
		var str = `<h2>${title}</h2>`;
		questionList.forEach((item, index) => {
			var { isMul, type, topic, answer, content, options, point } = item;
			var id = index;
			var opts = typeRender(id, type, options);
			var cont = "";
			if (content) {
				content = content.replace(/</g, '&lt;')
				content = content.replace(/>/g, '&gt;')
				cont = `<pre><code>${content}</code></pre>`;
			}
			str += `<div class='exam-item'>
      ${id + 1}. ${topic.replace(/([A-Za-z]\w*)/g, '<code>$1</code>')} (${point}分)

      ${cont}

			<div class="items" data-id="${id}" data-type="${type}" data-isMul="${isMul}">
				${opts}
			</div>
		</div>
    `;
		});
		if (dom) {
			str += '<button class="xui_btn xui_btn_default chapter-submit">提交</button>'
			dom.innerHTML = str;
		} else {
			xui.message("题目生成失败, 请重试!", 2000);
		}
	}

	// 渲染题目 类别区分
	function typeRender(id, type, options) {
		var opts = "";
		if (type === "radio") {
			options.forEach((ele, inx) => {
				opts += `
          <input class="xui_radio" id="radio_${inx}_${id}" value="${ele}" type="radio" name="radio" />
          <label for="radio_${inx}_${id}" class="xui_radio_box">${ele}</label>
        `;
			});
		}
		if (type === "input") {
			opts += `
      <div class="xui_content">
          <input type="text" class="xui_input" placeholder="请输入答案" />
      </div>
    `;
		}
		if (type === "checkbox") {
			options.forEach((ele, inx) => {
				opts += `
          <div><input class="xui_checkbox" id="checkbox_${inx}_${id}" value="${ele}" type="checkbox" name="checkbox" />
          <label for="checkbox_${inx}_${id}" class="xui_checkbox_box">${ele}</label></div>
        `;
			});
		}
		if (type === "textarea") {
			opts += `<textarea id="textarea_${id}" class="xui_textarea"></textarea>`;
		}
		return opts;
	}

	// 大题的标题
	function titleRender(isMul) { }

	// 计算分数几何
	function calculate() {
		if (dom) {
			// 获取题目
			var items = [...dom.querySelectorAll('.items')];
			// 把题目的结果放到一个对象上
			var result = {};
			var total = 0;
			items.forEach(item => {
				var attr = item.getAttribute('data-type');
				var isMul = item.getAttribute('data-isMul');
				var id = item.getAttribute('data-id');
				var obj = questionList[id];
				var val = '';
				if (attr === "radio" || attr === 'checkbox') {
					var list = [...item.querySelectorAll('input:checked')];
					var res = []
					list.forEach(ele => {
						res.push(ele.value)
					})
					result[id] = res.toString();
				}
				if (attr === "input") {
					val = item.querySelector('input').value;
					result[id] = val;
				}
				if (attr === "textarea") {
					val = item.querySelector('textarea').value;
					result[id] = val;
				}
				// 答案的判断-正确与否
				if (result[id] == obj.answer) {
					total += obj.point;
					removeClass(item.parentElement, 'error')
					addClass(item.parentElement, 'bingo')
				} else {
					if (obj.isExecuted) {
						var code = eval(result[id]);
						if (code && code.toString() == obj.answer) {
							total += obj.point;
							removeClass(item.parentElement, 'error')
							addClass(item.parentElement, 'bingo')
						}
					}else if(obj.answer === 'DIY'){
						addClass(item.parentElement, 'diy')
					}else{
						removeClass(item.parentElement, 'bingo')
						addClass(item.parentElement, 'error')
					}
				}
			});
			return total;
		}
	}

	// 样式操作
	function addClass(ele, name) {
		return ele.classList.add(name)
	}

	function removeClass(ele, name) {
		return ele.classList.remove(name)
	}

	function event(){
		var btn = dom.querySelector(".chapter-submit");
		btn.addEventListener("click", () => {
			xui.prompt({
				tips: "提示",
				text: "确定交卷吗?",
				isShowClose: true,
				confirmBtn: {
					text: "ok",
					fn() {
						// 获取答案
						var answer = calculate();
						xui.message("您的分数为: " + answer + " 分", 2000);
					},
				},
				cancelBtn: {
					text: "cancel",
					fn() {
						xui.message("别再看了, 直接提交吧!");
					},
				},
			});
		});
	}

	render();
	event();
})(window);
