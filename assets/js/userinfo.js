var form = layui.form;
// 获取信息反填到页面    表单---表单取值/赋值
function render() {
  $.ajax({
    url: '/my/user/userinfo',
    success: function (res) {
      // console.log(res);
      if (res.status === 0) {
        form.val('user', res.data)
      }
    }
  })
}
render()
// 更新信息
$('.layui-card form').on('submit', function (e) {
  e.preventDefault()
  var data = $(this).serialize()
  $.ajax({
    type: 'post',
    data: data,
    url: '/my/user/userinfo',
    success: function (res) {
      // console.log(res);
      layer.msg(res.message)
      if (res.status === 0) {
        window.parent.getUserInfo()
      }
    }
  })
})
// 重置
$('.layui-btn-primary').on('click', function () {
  // 调用数据反填函数
  render()
})