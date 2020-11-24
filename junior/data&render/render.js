(function (w) {
  // 生成考试函数
  let dom = document.querySelector("#junior-content");
	function render() {
		let str = "";
		juniorList.forEach((item) => {
			const { id, isMul, type, topic, answer, content, options } = item;
			let opts = typeRender(id, type, options);
			let cont = "";
			if (content) {
				cont = `
<pre><code>
${content}
</code></pre>
      `;
			}
			str += `
      ${id}. ${topic}:

      ${cont}

      <div class="items" data-id="${id}" data-type="${type}" data-isMul="${isMul}">${opts}</div><br/>
    `;
		});
		if (dom) {
			dom.innerHTML = str;
		} else {
			xui.message("题目生成失败, 请重试!", 2000);
		}
	}

	// 题目类别区分
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
	function titleRender(isMul) {}

	function calculate() {
    if(dom){
      let items = [...dom.querySelectorAll('.items')];
      let result = {};
      items.forEach(item=>{
        let attr = item.getAttribute('data-type');
        let isMul = item.getAttribute('data-isMul');
        let id = item.getAttribute('data-id');
        let val = '';
        if(attr === "radio" || attr === 'checkbox'){
          let list = [...item.querySelectorAll('input:checked')];
          let res = []
          list.forEach(ele=>{
            res.push(ele.value)
          })
          result[id] = res.toString();
        }
        if(attr === "input"){
          val = item.querySelector('input').value;
          result[id] = val;
        }
        if(attr === "textarea"){
          val = item.querySelector('textarea').value;
          result[id] = val;
        }
      });
      return result;
    }
  }

	var btn = document.querySelector(".junior-submit");
	btn.addEventListener("click", () => {
		xui.prompt({
			tips: "提示",
			text: "确定交卷了吗?",
			isShowClose: true,
			confirmBtn: {
				text: "ok",
				fn() {
          // 获取答案
          let answerObj = calculate();
          // 分析答案
          let total = 0;
          juniorList.forEach(item=>{
            console.log(item, answerObj)
            if(item.answer === answerObj[item.id]){
              total += item.point;
            }
          });
          xui.message("您的分数为: " + total);
				},
			},
			cancelBtn: {
				text: "cancel",
				fn() {
					xui.message("you clicked cancel");
				},
			},
		});
	});

	render();
})(window);
