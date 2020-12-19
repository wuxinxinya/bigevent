

// 获取文章分类----渲染
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
var addIndex;
$('.layui-card-header button').click(function () {
  addIndex = layer.open({
    type: 1,//层类型---1页面层
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
        layer.close(addIndex);
      }
    }
  });
});

// 重置-----动态添加元素要用事件委托方式添加事件
$('body').on('click', '.layui-btn-primary', function () {
  $('#add-form')[0].reset()
})

// 删除
$('body').on('click', '.delete', function () {
  // 获取id
  var id = $(this).attr('data-id')
  // console.log(id);
  layer.confirm('确定删除吗？', { icon: 3, title: '提示' }, function (index) {
    //do something
    $.ajax({
      type: 'get',
      url: '/my/category/delete',
      data: { id },
      success: function (res) {
        layer.msg(res.message);
        if (res.status === 0) {
          // 重新渲染
          renderCategory()
        }
      }
    })
    layer.close(index);
  });
})

// 编辑

var editIndex;
$('body').on('click', '.edit', function () {
  // let id = $(this).attr('data-id');
  // let name = $(this).attr('data-name');
  // let alias = $(this).attr('data-alias');
  var data = $(this).data()//获取所有的data-***的值
  // 打开弹出层
  editIndex = layer.open({
    type: 1,//层类型---1页面层
    title: '修改文章分类',
    content: $('#bj').html(),
    area: ['500px', '250px'],
    success: function () {
      var form = layui.form;
      // form.val('art', { id, name, alias })
      form.val('art', data)
    }
  });
})

// 确认编辑修改
$('body').on('submit', '#edit-form', function (e) {
  e.preventDefault();
  var data = $(this).serialize()
  // console.log(data);
  $.ajax({
    type: 'post',
    url: '/my/category/update',
    data: data,
    success: function (res) {
      layer.msg(res.message)
      if (res.status === 0) {
        // 重新渲染
        renderCategory()
        // 关闭弹层
        layer.close(editIndex)
      }
    }
  })
})
