var form = layui.form;
// 表单验证
form.verify({
  len: [/^[\S]{6,12}$/
    , '密码必须6到12位，且不能出现空格'],
  diff: function (val) {
    var data = $('input[name=oldPwd]').val()
    if (data === val) {
      return '新密码不能和原密码一样'
    }
  },
  same: function (val) {
    // val代表same给谁加就代表谁的值
    var data = $('input[name=newPwd]').val()
    if (!data === val) {
      return '确认密码和新密码不一致'
    }
  }
})
// 完成修改功能
$('form').on('submit', function (e) {
  e.preventDefault()
  // 获取表单各项数据-----按接口要求---数据是字符串类---使用serialize()方法
  var data = $(this).serialize()
  $.ajax({
    type: 'post',
    url: '/my/user/updatepwd',
    data: data,
    success: function (res) {
      layer.msg(res.message)
      if (res.status === 0) {
        // 修改密码成功---清除token，重新登录
        localStorage.removeItem('token')
        // 注意这里是iframe标签----要找到index.html在跳转
        // console.log(window.parent.getUserInfo);
        // 注意路径
        window.parent.location.href = '../login.html'
      }
    }
  })
})