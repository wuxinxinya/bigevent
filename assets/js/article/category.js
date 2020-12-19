

// 获取文章分类
function renderCategory() {
  $.ajax({
    url: '/my/category/list',
    success: function (res) {
      // console.log(res);
      layer.msg(res.message)
      if (res.status === 0) {
        var shuju = template('art', res)
        $('tbody').html(shuju)
      }
    }
  })
}
renderCategory()

// --------------- 点击 添加类别 ，弹层 ---------------------
$('.layui-card-header button').click(function () {
  layer.open({
    type: 1,
    title: '添加类别',
    content: $('#tpl-add').html(),
    area: ['500px', '250px']
  });
});

// --------------   实现添加类别  ----------------
// 必须使用事件委托的方案，监听表单的提交事件
$('body').on('submit', '#add-form', function (e) {
  e.preventDefault();
  // alert(123);
  $.ajax({
    type: 'POST',
    url: '/my/category/add',
    data: $(this).serialize(), // 当你使用serialize的时候，必须查看表单input的name
    success: function (res) {
      // 无论成功，还是失败，都给提示
      layer.msg(res.message);
      if (res.status === 0) {
        // 添加成功，重新渲染列表
        renderCategory();
        // 关闭弹出层
        layer.closeAll();
      }
    }
  });
});