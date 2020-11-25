<link rel="stylesheet" type="text/css" href="../assets/xui.css">

<style>
.exam-item{
  position: relative;
  margin-bottom: 20px;
  padding: 2px 4px;
  border: 1px rgb(204 204 204) solid;
  border-radius: 4px;
  transition: all .4s ease-out;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}
.bingo::after, .error::after{
  position: absolute;
  right: 4px;
  top: 0;
  font-weight: bold;
  font-size: 30px;
  line-height: 30px;
  font-family: consolas;
}
.bingo::after{
  content: '√';
  color: rgb(0 128 0);
}
.error:after{
  content: '×';
  color: red;
  font-size: 34px;
  line-height: 34px;
}
</style>

<script type="text/javascript" src="../assets/xui.js"></script>


# 第一章

<div id="junior-content"></div>
<button class="xui_btn xui_btn_default junior-submit">提交</button>
<script type="text/javascript" src="./data&render/junior.js"></script>
<script type="text/javascript" src="./data&render/render.js"></script>
