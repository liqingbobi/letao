

$(function () { 

    // 定义 当前页面和总页数
    var currentPage = 1 ;
    var pageSize = 5 ;
    // 进入页面渲染第一页
    render() ;

    function render () { 
        // 动态生成页面
        $.ajax({
            type:'get' ,
            url: '/category/querySecondCategoryPaging' ,
            data: {
                page: currentPage,
                pageSize : pageSize
            },
            dataType: 'json' ,
            success: function (info) { 
                console.log(info) ;
                var htmlStr = template('secondTpl' , info) ;
                $('tbody').html(htmlStr) ;
                // 分页
                $('#paginator').bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion: 3 ,
                    // 当前页
                    currentPage: info.page ,
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size) ,
                    // 给页面注册事件
                    onPageClicked: function (a,b,c,page) { 
                        // 更新页面
                        currentPage = page ;
                        // 重新渲染
                        render() ;
                     }
                })
             }
        })
    }

    // 给添加按钮注册事件 显示模板
    $('#addBth').click(function () { 
        $('#addModal').modal('show') ;

        // 发送 ajax 获取后台数据 渲染页面
        $.ajax({
            type: 'get' ,
            url: '/category/queryTopCategoryPaging' ,
            data: {
                page : 1 ,
                pageSize : 100
            },
            dataType: 'json' ,
            success: function (info) { 
                console.log(info) ;
                var htmlStr = template('dropdownTpl' , info) ;
                $('.dropdown-menu').html(htmlStr) ;
             }
        })
    })

      // 3. 给所有的下拉菜单的 a 添加点击事件 (通过事件委托)
  $('.dropdown-menu').on("click", "a", function() {
    
        // 获取自己的文本
        var txt = $(this).text();
        // 设置给按钮
        $('#dropdownText').text( txt );
      });
    
    
    
      // 4. 配置fileupload进行初始化
      $('#fileupload').fileupload({
        dataType: "json",
        // 文件上传完成的回调函数
        done: function( e, data ) {
          console.log( data );
          var picUrl = data.result.picAddr; // 获取地址
          $('#imgBox img').attr("src", picUrl);
        }
      })


 })