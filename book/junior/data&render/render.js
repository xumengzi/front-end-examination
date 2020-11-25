(function (w) {
	// 生成考试函数
	let dom = document.querySelector("#junior-content");
	function render() {
		let str = "";
		juniorList.forEach((item) => {
			const { id, isMul, type, topic, answer, content, options, point } = item;
			let opts = typeRender(id, type, options);
			let cont = "";
			if (content) {
				cont = `<pre><code>${content}</code></pre>`;
			}
			str += `<div class='exam-item'>
      ${id + 1}. ${topic}: (${point}分)

      ${cont}

			<div class="items" data-id="${id}" data-type="${type}" data-isMul="${isMul}">
				${opts}
			</div>
		</div>
    `;
		});
		if (dom) {
			dom.innerHTML = str;
		} else {
			xui.message("题目生成失败, 请重试!", 2000);
		}
	}

	// 渲染题目 类别区分
	function typeRender(id, type, options) {
		let opts = "";
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
          <input class="xui_checkbox" id="checkbox_${inx}_${id}" value="${ele}" type="checkbox" name="checkbox" />
          <label for="checkbox_${inx}_${id}" class="xui_checkbox_box">${ele}</label>
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
			let items = [...dom.querySelectorAll('.items')];
			// 把题目的结果放到一个对象上
			let result = {};
			let total = 0;
			items.forEach(item => {
				let attr = item.getAttribute('data-type');
				let isMul = item.getAttribute('data-isMul');
				let id = item.getAttribute('data-id');
				let obj = juniorList[id];
				let val = '';
				if (attr === "radio" || attr === 'checkbox') {
					let list = [...item.querySelectorAll('input:checked')];
					let res = []
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
					}
					removeClass(item.parentElement, 'bingo')
					addClass(item.parentElement, 'error')
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

	var btn = document.querySelector(".junior-submit");
	btn.addEventListener("click", () => {
		xui.prompt({
			tips: "提示",
			text: "确定交卷吗?",
			isShowClose: true,
			confirmBtn: {
				text: "ok",
				fn() {
					// 获取答案
					let answer = calculate();
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

	render();
})(window);
