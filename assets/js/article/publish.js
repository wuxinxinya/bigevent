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
$('button:contains("选择图片")').click(function () {
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