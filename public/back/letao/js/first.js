

$(function () { 
    // 进入页面发送 ajax 请求后台信息 动态渲染页面
    var currentPage = 1 ;
    var pageSize = 5 ;
    render() ;
    function render () { 

        $.ajax({
            type: 'get' ,
            url: '/category/queryTopCategoryPaging' ,
            data: {
                page: currentPage ,
                pageSize: pageSize
            },
            dataType: 'json' ,
            success: function (info) { 
                console.log(info) ;
                var htmlStr = template('first' , info);
                $('tbody').html(htmlStr) ;
    
                // 分页初始化
                $('#paginator').bootstrapPaginator({
                    // 版本号'
                    bootstrapMajorVersion: 3 ,
                    // 当前页
                    currentPage: info.page ,
                    // 总页数
                    totalPages: Math.ceil( info.total / info.size ) ,
                    // 注册页码点击事件
                    onPageClicked: function (a,b,c,page) { 
                        // 更新当前页面
                        currentPage = page ;
                        // 重新渲染
                        render() ;
                     }
                })
             }
        })
    }

    // 给点击按钮注册事件 显示拟态框
    $('#addBtn').click(function () { 
        $('#addModal').modal('show') ;
    })

    // 进行配置验证表单
    $('#form').bootstrapValidator({
        // 配置图标
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',    // 校验成功
            invalid: 'glyphicon glyphicon-remove',   // 校验失败
            validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
        // 校验文字
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '请输入一级分类名称'
                    }
                }
            }
        }
    })

    // 把准备好的表单数据通过 ajax 发送到数据库 再动态渲染到页面中
    $('#form').on('success.form.bv' , function (e) { 
        e.preventDefault() ;

        //  通过 ajax 提交信息
        $.ajax({
            type: 'post' ,
            url: '/category/addTopCategory' ,
            data: $('#form').serialize() ,
            dataType : 'json' ,
            success: function (info) { 
                console.log(info) ;
                if(info.success){
                    // 添加成功 关闭拟态框
                    $('#addModal').modal('hide') ;
                    // 再重新渲染第一页面
                    currentPage = 1 ;
                    render() ;
                    // 重置表单内容和状态
                    $('#form').data('bootstrapValidator').resetForm(true) ;
                }
             }
        })
     })
 })