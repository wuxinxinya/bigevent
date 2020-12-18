// 入口函数
window.onload = function () {
  // --------------------- 切换登录和注册的盒子 --------------------
  $('.login a').click(function () {
    $('.register').show().prev().hide();
  });

  $('.register a').click(function () {
    $('.login').show().next().hide();
  });
  // ------------------注册---------------
  $('.register form').on('submit', function (e) {
    e.preventDefault();
    // 收集表单数据（       一定要按照接口要求来         ）
    var data = $(this).serialize();
    console.log(data);
    console.log(this);
    $.ajax({
      type: 'post',
      url: '/api/reguser',
      data: data,
      success: function (res) {
        // alert(res.message)
        layer.msg(res.message);
        if (res.status === 0) {
          // 注册成功，显示登录的盒子
          $('.login').show().next().hide();
          // 清空注册的表单(reset是dom方法，所以把jQuery对象转成DOM对象)
          $('.register form')[0].reset();
        }
      }
    })
  })
  // -----------注册的表单验证--------------
  // 必填项不能为空
  // 密码长度6-12，且不能有空格
  // 两次密码必须一致（确认密码）
  // 加载form模块
  var form = layui.form;
  form.verify({
    // 值可以是数组，也可以是函数
    len: [/^\S{6,12}$/, '长度6~12位，不能有空格'],
    // 使用函数
    same: function (val) {
      // 形参 val，表示使用验证规则的输入框的值
      // 比如重复密码使用了这个验证规则，形参val表示输入的重复密码
      // 功能代码
      // 获取密码
      var pwd = $('.pwd').val();
      // 比较
      // return，返回的值，就是错误提示信息
      if (pwd !== val) return '两次密码不一致哟~';
    }
  })
  // 登录
  $('.login form').on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serialize()
    $.ajax({
      type: 'post',
      data: data,
      url: '/api/login',
      success: function (res) {
        layer.msg(res.message);
        if (res.status === 0) {
          location.href = 'index.html'
          localStorage.setItem('token', res.token)
        }

      }
    })
  })



  // 入口函数的尾部
}