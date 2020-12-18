// 全局变量 baseUrl，以便后续多次使用
let baseUrl = 'http://www.itcbc.com:8080';

// 这里统一配置Ajax请求
$.ajaxPrefilter(function (options) {
  // options表示ajax选项

  // 统一配置url
  options.url = baseUrl + options.url;

  // 完整的url    http://ajax.frontend.itheima.net/my/userinfo
  if (options.url.includes('/my/')) {
    // 2. headers，请求头加token（是以 /my 开头的 接口，需要这个配置）
    options.headers = {
      Authorization: localStorage.getItem('token')
    }
    // 3. ajax请求完成之后，判断token的真假（是以 /my 开头的 接口，需要这个配置）
    options.complete = function (xhr) {
      // ajax请求完成，根据服务器返回的结果判断token的真假
      if (xhr.responseJSON && xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
        // 说明token是假的或者过期的
        // 1. 删除假token
        localStorage.removeItem('token');
        // 2. 跳转到登录页面
        location.href = './login.html';
      }
    }
  }
});