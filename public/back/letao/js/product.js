
$(function () { 

    var currentPage = 1 ; // 当前页
    var pageSize = 2 ; //每页条数
    var picArr = [] ;  // 存放所有的图片对象

    // 一进页面 渲染
    render() ;

    function render () { 
        $.ajax({
            type: 'get' ,
            url: '/product/queryProductDetailList' ,
            data: {
                page: currentPage ,
                pageSize: pageSize
            },
            dataType: 'json' ,
            success: function (info) { 
                console.log(info) ;
                var htmlStr = template('product' , info) ;
                $('tbody').html(htmlStr) ;

                // 进行分页初始化
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3 , //版本
                    currentPage: info.page , //页面
                    totalPages: Math.ceil( info.total / info.size ),
                    // 给页码添加点击事件
                    onPageClicked: function (a,b,c,page) { 
                        currentPage = page ;
                        // 重新渲染
                        render() ;
                     }
                })
             }
        })
    }


    // 给添加按钮注册事件
    $('#addBtn').click(function () { 
        $('#addModal').modal('show') ;
        // 发送 ajax 请求 获取下拉菜单进行渲染
        $.ajax({
            type: 'get' ,
            url: '/category/querySecondCategoryPaging' ,
            data: {
                page: 1 ,
                pageSize: 100
            },
            dataType: 'json' ,
            success: function (info) { 
                console.log(info) ;
                var htmlStr = template('dropdown' , info) ;
                $('.dropdown-menu').html(htmlStr) ;
             }
        })
    });



    // 给下拉菜单的所有的 a 添加点击事件
    $('.dropdown-menu').on('click' , 'a' , function () { 
        // 获取文本 设置给按钮
        var txt = $(this).text() ;
        // 设置给按钮
        $('#dropdownText').text(txt) ;

        // 获取 id 设置给隐藏域
        var id = $(this).data('id') ;
        $('[name="brandId"]').val(id) ;
        // 手动将隐藏域校验状态改为成功
        $('#form').data('bootstrapValidator').updateStatus('brandId' , "VALID") ;
    })



    // 配置多个文件上传
    $('#fileupload').fileupload({
        // 返回数据类型
        dataType: 'json' ,
        // done 文件成功上传完成的回调函数
        done: function (e , data) { 
            console.log(data.result) ;
            // 后台返回的图片对象
            var picObj = data.result ;

            //  往数组前面追加
            picArr.unshift(picObj) ;
            // 返回的图片地址
            var picUrl = picObj.picAddr ;

            // 将图片添加到 imgBox 最前面
            $('#imgBox').prepend('<img style="width: 100px;" src="'+ picUrl +'" alt="">') ;

            if( picArr.length > 3 ){
                // 长度 3 张的就保留最新的 去掉最后的 删除最后一张
                picArr.pop() //删除数组的最后一张

                $('#imgBox img:last-of-type').remove() ;
            }
            // 判断数组长度 如果满3张 说明校验成功
            if(picArr.length === 3){
                // 将隐藏域校验状态 给成成功
                $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID') ;
            }
         }
    })



    // 配置表单校验
    $('#form').bootstrapValidator({
        // 配置不校验的类型 对 hidden 需要进行校验
        excluded: [] ,

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',    // 校验成功
            invalid: 'glyphicon glyphicon-remove',   // 校验失败
            validating: 'glyphicon glyphicon-refresh'  // 校验中
        },

        // 配置校验字段
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    // 注册数字格式 非零开头的数字
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存格式,必须是非零开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/ ,
                        message: '必须 xx-xx 的格式, xx必须为两位数字'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品原价'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品现价'
                    }
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message: '请上传三张图片'
                    }
                }
            }
            
        }
    })



    // 注册表单校验成功事件 
    $('#form').on('success.form.bv' , function (e) { 
        // 阻止默认提交 通过 ajax 提交
        e.preventDefault() ;

        var paramsStr = $('#form').serialize() ;
        // 拼接图片的数据
        paramsStr += "&picArr" + JSON.stringify(picArr) ;
        // 发送 ajax 
        $.ajax({
            type: 'post',
            url: "/product/addProduct",
            data: paramsStr,
            dataType: "json",
            success: function( info ) {
              console.log( info );
              if ( info.success ) {
                // 添加成功
                // 关闭模态框
                $('#addModal').modal("hide");
                // 重新渲染第一页
                currentPage = 1;
                render();
      
                // 重置内容和状态
                $('#form').data("bootstrapValidator").resetForm(true);
      
                // 将下拉菜单的按钮文本 和 图片重置
                $('#dropdownText').text("请选择二级分类");
                $('#imgBox img').remove();
              }
            }
        })
     })




 })