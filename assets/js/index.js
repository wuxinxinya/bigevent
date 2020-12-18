
// 获取用户信息
function getUserInfo() {
  $.ajax({
    // type: 'GET', // type不填，默认就是GET
    url: '/my/user/userinfo',
    success: function (res) {
      // console.log(res);
      if (res.status === 0) {
        // 1、设置欢迎语（有昵称，就使用昵称，没有昵称，使用用户名）
        var myname = res.data.nickname || res.data.username;
        $('.myname').text(myname);
        // 2、设置头像（有图片，使用图片；没有图片，使用名字的首字母）
        if (res.data.user_pic) {
          // 使用图片
          $('.layui-nav-img').attr('src', res.data.user_pic).show();
          // $('.text-head').hide();
        } else {
          var t = myname.substr(0, 1).toUpperCase();
          // jQuery中的show方法，会设置元素 display:inline;
          $('.text-head').text(t).css('display', 'inline-block');
          // $('.layui-nav-img').hide();
        }
      }
    },
    // complete函数，在ajax请求完成（无论成功还是失败）之后触发
    // complete: function (xhr) {
    //   // 这里判断身份认证是否成功
    //   console.log(xhr);
    //   if (xhr.responseJSON && xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
    //     // 删除假token
    //     localStorage.removeItem('token');
    //     // 跳转到登录页面
    //     location.href = './login.html';
    //   }
    // },
    // jQuery中ajax选项，有一个headers，通过他，可以设置请求头
    // headers: {
    //   'Authorization': localStorage.getItem('token')
    // }
  });
}
getUserInfo()

// --------------  退出功能 ---------------------
// 退出的时候，两个操作
// - 删除token
// - 页面跳转到登录页面
$('#logout').click(function () {
  // 弹出层，询问是否要退出
  layer.confirm('你确定退出吗？你退出了还得登录，你想好了吗？', { icon: 3, title: '提示' }, function (index) {
    //do something
    localStorage.removeItem('token');
    location.href = './login.html';
    layer.close(index);
  });
});

