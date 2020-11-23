// 生成考试函数
function render() {
  let dom = document.querySelector('#junior-content');
  let str = '';
  juniorList.forEach((item => {
    const { id, column, type, topic, answer, content, options} = item;
    let opts = typeRender(id, type, options);
    let cont = '';
    if (content){
      cont = `
<pre><code>
${content}
</code></pre>
      `
    }
    str += `
      ${id}. ${topic}:

      ${cont}

      <div>${opts}</div><br/>
    `;
  }));
  if(dom){
    dom.innerHTML = str
  }else{
    xui.message('题目生成失败, 请重试!', 2000)
  }
};

// 题目类别区分
function typeRender(id, type, options){
  let opts = '';
  if (type === 'radio') {
    options.forEach((ele, inx) => {
      opts += `
          <input class="xui_radio" id="radio_${inx}_${id}" type="radio" name="radio" />
          <label for="radio_${inx}_${id}" class="xui_radio_box">${ele}</label>
        `
    })
  };
  if(type === 'input'){
    opts += `
      <div class="xui_content">
          <input type="text" class="xui_input" placeholder="请输入答案" />
      </div>
    `
  };
  if(type === 'checkbox'){
    options.forEach((ele, inx) => {
      opts += `
          <input class="xui_checkbox" id="checkbox_${inx}_${id}" type="checkbox" name="checkbox" />
          <label for="checkbox_${inx}_${id}" class="xui_checkbox_box">${ele}</label>
        `
    })
  }
  return opts;
};

// 大题的标题
function titleRender(column){

};

render();
