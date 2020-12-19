// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')

// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options);


// 上传头像
// var upload = layui.upload;
// //执行实例
// var uploadInst = upload.render({
//   elem: '#test1' //绑定元素
//   , url: '/upload/' //上传接口
//   , done: function (res) {
//     console.log(res);
//     //上传完毕回调
//     // $.ajax({
//     //   type: 'post',
//     //   url: '/my/user/avatar',
//     //   data: res,
//     //   success: function (w) {
//     //     console.log(w);
//     //   }
//     // })
//   }
//   , error: function () {
//     //请求异常回调
//   }
// })


// -------------  点击  上传  ，可以选择图片  ------------
$('button:contains("上传")').click(function () {
  // console.log($('#file'));
  $('#file').trigger('click');
});

// 文件域的内容改变的时候，更换剪裁区的图片
$('#file').change(function () {
  if (this.files.length > 0) {
    // 3.1) 先找到文件对象
    // console.dir(this)
    var fileObj = this.files[0];
    // 3.2) 为选择的图片生成一个临时的url
    var url = URL.createObjectURL(fileObj);
    // console.log(url);
    // 3.3) 更换图片的src属性即可（销毁剪裁区 --> 更换src属性 --> 重新创建剪裁框）
    $image.cropper('destroy').attr('src', url).cropper(options);
  }

});


// ------------- 4. 点击确定按钮，剪裁图片，把图片转成base64格式，ajax提交字符串，完成更换 ------------
$('button:contains("确定")').click(function () {
  // 4.1）调用插件方法，剪裁图片；剪裁之后得到一张canvas格式的图片
  var canvas = $image.cropper('getCroppedCanvas', {
    width: 100,
    height: 100
  });
  // 4.2) 把canvas图片转成base64格式，得到超长字符串
  var base64 = canvas.toDataURL('image/png');
  // console.log(base64);
  // 4.3) ajax提交字符串，完成更新
  $.ajax({
    type: 'POST',
    url: '/my/user/avatar',
    data: { avatar: base64 },
    success: function (res) {
      layer.msg(res.message);
      if (res.status === 0) {
        // 重新渲染父页面的头像
        window.parent.getUserInfo();
      }
    }
  });
});