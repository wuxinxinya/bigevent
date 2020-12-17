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
        alert(res.message)
        if (res.status === 0) {
          // 注册成功，显示登录的盒子
          $('.login').show().next().hide();
          // 清空注册的表单(reset是dom方法，所以把jQuery对象转成DOM对象)
          $('.register form')[0].reset();
        }
      }
    })
  })



  // 入口函数的尾部
}