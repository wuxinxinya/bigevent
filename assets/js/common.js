// 全局变量 baseUrl，以便后续多次使用
let baseUrl = 'http://www.itcbc.com:8080';

// 这里统一配置Ajax请求
$.ajaxPrefilter(function (options) {
  // 统一配置url
  options.url = baseUrl + options.url;
});