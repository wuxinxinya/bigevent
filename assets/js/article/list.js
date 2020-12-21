// ----------------获取数据并渲染---------------
var data = {
  pagenum: 1,//当前页
  pagesize: 2,//一页显示几条
}
function getList() {
  $.ajax({
    url: '/my/article/list',
    data: data,
    success: function (res) {
      console.log(res);
      var str = template('tel-list', res)
      $('tbody').html(str)
      // 调用分页
      showPage(res.total)
    }
  })
}
getList()

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