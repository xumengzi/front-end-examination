<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 第一章

#### 选择题

<div id="junior-content"></div>
<button class="xui_btn xui_btn_default junior-submit">提交</button>

<script>
var btn = document.querySelector('.junior-submit');
btn.addEventListener('click',() => {
  xui.prompt({
    tips: '提示',
    text: '确定交卷了吗?',
    isShowClose: true,
    confirmBtn: {
      text: 'ok',
      fn() {
        xui.message('you clicked ok');
      }
    },
    cancelBtn: {
      text: 'cancel',
      fn() {
        xui.message('you clicked cancel');
      }
    },
  });
})
</script>
<script type="text/javascript" src="./data&render/junior.js"></script>
<script type="text/javascript" src="./data&render/render.js"></script>
