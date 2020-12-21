// ----tempalte过滤器，时间处理-------
function padZero(n) {
  if (n < 10) {
    return '0' + n
  } else {
    return n
  }
}

template.defaults.imports.dateFormat = function (dtStr) {
  var dt = new Date(dtStr)

  var y = dt.getFullYear()
  var m = padZero(dt.getMonth() + 1)
  var d = padZero(dt.getDate())

  var hh = padZero(dt.getHours())
  var mm = padZero(dt.getMinutes())
  var ss = padZero(dt.getSeconds())

  return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
}

// ----------------获取数据并渲染---------------
var data = {
  pagenum: 1,//当前页
  pagesize: 2,//一页显示几条
  // cate_id: 1,//类别id
  // state: '已发布',//状态
}
function getList() {
  $.ajax({
    url: '/my/article/list',
    data: data,
    success: function (res) {
      // console.log(res);
      var str = template('tel-list', res)
      $('tbody').html(str)
      // 调用分页
      showPage(res.total)
    }
  })
}
getList()

// 分页
function showPage(t) {
  var laypage = layui.laypage;

  //执行一个laypage实例
  laypage.render({
    elem: 'page-box', //注意，这里的 test1 是 ID，不用加 # 号
    count: t,//数据总数，从服务端得到
    limit: data.pagesize,//每页显示几条
    curr: data.pagenum,//当前页
    limits: [2, 3, 5, 10],//每页条数的选择项
    groups: 5,//连续出现的页码个数
    layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],//自定义排版
    ///1、生成页码会自动调用一次 2、切换分页时调用函数
    jump: function (obj, first) {
      //obj包含了当前分页的所有参数，比如：
      // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
      // console.log(obj.limit); //得到每页显示的条数

      //首次不执行
      if (!first) {
        //do something
        data.pagenum = obj.curr;
        data.pagesize = obj.limit;
        getList()
      }
    }
  });
}
// ----------------分类下拉列表，并渲染到下拉菜单处---------------
var form = layui.form;
$.ajax({
  url: '/my/category/list',
  success: function (res) {
    // console.log(res);
    var str = template('tel-xiala', res)
    $('#sel-01').html(str)
    // 动态添加，所以---调用form表单，更新渲染方法
    form.render('select');
  }
})
// --------根据分类和状态下拉菜单状态筛选文章列表-------------------------
// 使用form表单的submit事件也可以，注意-----this指向不同----
// $('form').on('submit', function (e) {
//   e.preventDefault();
//   console.log(this);//form
// })
$('#findAll').on('click', function (e) {
  e.preventDefault();
  //console.log(this);//button
  // 获取两个下拉菜单所选内容
  var data1 = $('#sel-01').val()//分类
  var data2 = $('#sel-02').val()//状态
  // console.log(data1, data2);
  data1 ? data.cate_id = data1 : delete data.cate_id
  data2 ? data.state = data2 : delete data.state
  // 重置页码为1
  data.pagenum = 1;
  // 重新渲染
  getList()
})


// 删除
$('tbody').on('click', '#remove-id', function (e) {
  // 获取id
  var id = $(this).attr('data-id')
  layer.confirm('确定删除吗？', function () {
    $.ajax({
      type: 'get',
      url: '/my/article/delete/' + id,
      success: function (res) {
        layer.msg(res.message)
        if (res.status === 0) {
          // 重新渲染页面
          getList()
        }
      }
    })
  });

})

// 编辑功能
$('tbody').on('click', '#edit-id', function () {
  var id = $(this).attr('data-id')
  location.href = './edit.html?id=' + id
})