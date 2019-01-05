

$(function () { 
    
    var currentId ; //当前操作的用户id
    var isDelete ; //当前需要修改用户的状态
    
    //声明变量可以切换页面
    var currentPage = 1 ;
    var pageSize = 5 ;
    // 进入页面渲染
    render() ;


    //页面渲染封装的函数
function render () { 
        // 动态渲染页面发送 ajax
    $.ajax({
        type: 'get' ,
        url: '/user/queryUser' ,
        data:{
            page: currentPage ,
            pageSize: pageSize ,
        },
        dataType:'json' ,
        success:function (info) { 
            console.log(info) ;
            var htmlStr = template('tp1' , info) ;
            // 添加到页面
            $('tbody').html(htmlStr);


            // 分页初始化
            $('#paginator').bootstrapPaginator({
                // 版本号
                bootstrapMajorVersion: 3,
                // 当前页
                currentPage:info.page ,
                // 总页数
                totalPages:Math.ceil(info.total/info.size) ,
                // 添加页码点击事件
                onPageClicked: function (a,b,c,page) { 
                    currentPage = page ;
                    render()
                 }
            })
         }
    })
}

    // 给按钮注册事件 通过事件委托给动态生成
    $('tbody').on('click' , '.btn' , function () { 
        // 弹出拟态框
        $('#userModal').modal('show') ;
        // 获取当前用户的 id
        currentId = $(this).parent().data('id') ;
        // 获取用户按钮的状态要更改  0 为禁用 ;  1 为启用
        isDelete = $(this).hasClass('btn-danger') ? 0 : 1 ;
     });

    //  给拟态框的确定按钮注册事件 修改用户状态并重新渲染页面后关闭拟态框
    $('#submitBtn').click(function () { 
        // 发送 ajax 修改后台数据
        $.ajax({
            type: 'post' ,
            url: '/user/updateUser' ,
            data: {
              id: currentId,
              isDelete: isDelete 
            },
            dataType: 'json' ,
            success: function (info) { 
                if(info.success){
                    // 关闭拟态框
                    $('#userModal').modal('hide') ;
                    // 重新渲染页面
                    render() ;
                }
             }
        })
     })
 })