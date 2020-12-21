// -------------获取分类，渲染到下拉分类下----------
var form = layui.form;
$.ajax({
  url: '/my/category/list',
  success: function (res) {
    var str = template('tel-category', res)
    $('select').html(str)
    // form表单的更新渲染
    // 单元素可能是动态插入的, form 模块 的自动化渲染是会对其失效的
    form.render('select');
  }
})

// 确认发布
$('#add-form').on('submit', function (e) {
  e.preventDefault()
  var fd = new FormData(this)
  fd.set('content', tinyMCE.activeEditor.getContent())


  // 4.1）调用插件方法，剪裁图片；剪裁之后得到一张canvas格式的图片
  var canvas = $image.cropper('getCroppedCanvas', {
    width: 400,
    height: 280
  });
  // 4.2) 把canvas图片转成base64格式，得到超长字符串
  var fileObj = canvas.toBlob(function (blob) {
    fd.append('cover_img', blob)
    // fd.forEach((item, i) => {
    //   console.log(item, i);
    // })

    $.ajax({
      type: 'post',
      url: '/my/article/add',
      data: fd,
      processData: false,
      contentType: false,
      success: function (res) {
        layer.msg(res.message);
        if (res.status === 0) {
          // 重新渲染父页面的头像
          location.href = './list.html'
        }
      }
    });
  });



})
// ----------------------------------------
initEditor()
// 1. 初始化图片裁剪器
var $image = $('#image')

// 2. 裁剪选项
var options = {
  aspectRatio: 400 / 280,
  preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options)
// -------------  点击  上传  ，可以选择图片  ------------
$('button:contains("选择封面")').click(function () {
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


