$(function () {

            // 定义 当前页面和总页数
            var currentPage = 1;
            var pageSize = 5;
            // 进入页面渲染第一页
            render();

            function render() {
                // 动态生成页面
                $.ajax({
                    type: 'get',
                    url: '/category/querySecondCategoryPaging',
                    data: {
                        page: currentPage,
                        pageSize: pageSize
                    },
                    dataType: 'json',
                    success: function (info) {
                        console.log(info);
                        var htmlStr = template('secondTpl', info);
                        $('tbody').html(htmlStr);
                        // 分页
                        $('#paginator').bootstrapPaginator({
                            // 版本号
                            bootstrapMajorVersion: 3,
                            // 当前页
                            currentPage: info.page,
                            // 总页数
                            totalPages: Math.ceil(info.total / info.size),
                            // 给页面注册事件
                            onPageClicked: function (a, b, c, page) {
                                // 更新页面
                                currentPage = page;
                                // 重新渲染
                                render();
                            }
                        })
                    }
                })
            }

            // 给添加按钮注册事件 显示模板
            $('#addBth').click(function () {
                $('#addModal').modal('show');

                // 发送 ajax 获取后台数据 渲染页面
                $.ajax({
                    type: 'get',
                    url: '/category/queryTopCategoryPaging',
                    data: {
                        page: 1,
                        pageSize: 100
                    },
                    dataType: 'json',
                    success: function (info) {
                        console.log(info);
                        var htmlStr = template('dropdownTpl', info);
                        $('.dropdown-menu').html(htmlStr);
                    }
                })
            })

            // 3. 给所有的下拉菜单的 a 添加点击事件 (通过事件委托)
            $('.dropdown-menu').on("click", "a", function () {

                // 获取自己的文本
                var txt = $(this).text();
                // 设置给按钮
                $('#dropdownText').text(txt);
                // 获取 id
                var id = $(this).data('id');
                // 设置给隐藏域 用于提交
                $('[name="categoryId"]').val(id) ;
                // 由于对隐藏域进项赋值 所有需要将隐藏域校验状态改成 成功
                $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')
            });



            // 4. 配置fileupload进行初始化
            $('#fileupload').fileupload({
                dataType: "json",
                // 文件上传完成的回调函数
                done: function (e, data) {
                    console.log(data);
                    var picUrl = data.result.picAddr; // 获取地址
                    $('#imgBox img').attr("src", picUrl);

                    //   将地址赋值给隐藏域 专门用于提交
                    $('[name="brandLogo"]').val(picUrl);

                    // 给隐藏域赋值完成 将校验状态改为成功
                    $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
                }
            })



            //   给表单添加校验
            $('#form').bootstrapValidator({
                    // 配置不校验的类型 
                    excluded: [],

                    // 配置图标
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok', // 校验成功
                        invalid: 'glyphicon glyphicon-remove', // 校验失败
                        validating: 'glyphicon glyphicon-refresh' // 校验中
                    },

                    // 配置校验的字段
                    fields: {
                        categoryId: {
                            validators: {
                                notEmpty: {
                                    message: '请选择一级分类'
                                }
                            }
                        },
                        brandName: {
                            validators: {
                                notEmpty: {
                                    message: "请输入二级分类名称"
                                }
                            }
                        },
                            brandLogo: {
                                validators: {
                                    notEmpty: {
                                        message: "请上传图片"
                                    }
                                }
                            }
                    }


            })

            // 注册表单校验成功事件 阻止默认的提交 通过 ajax 提交
            $('#form').on("success.form.bv", function( e ) {
                e.preventDefault();
            
                // 通过ajax提交
                $.ajax({
                  type: "post",
                  url: "/category/addSecondCategory",
                  data: $('#form').serialize(),
                  dataType: "json",
                  success: function( info ) {
                    console.log( info );
                    if ( info.success ) {
                      // 关闭模态框
                      $('#addModal').modal("hide");
                      // 重新渲染第一页
                      currentPage = 1;
                      render();
            
                      // 重置内容和状态
                      $('#form').data("bootstrapValidator").resetForm(true);
            
                      // 由于下拉菜单 和 图片不是表单元素, 需要手动重置
                      $('#dropdownText').text("请选择一级分类");
                      $('#imgBox img').attr("src", "./images/none.png");
                    }
                  }
                })
              })
        })