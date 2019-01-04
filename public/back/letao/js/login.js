
$(function () { 
    // 表单校验
    // (1) 用户名不能为空, 长度为2-6位
    // (2) 密码不能为空, 长度为6-12位
    $('#form').bootstrapValidator({
        //自定义图标显示
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            username:{
                validators:{
                    // 不能为空
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    // 长度校验
                    stringLength:{
                        min: 2,
                        max: 6,
                        message:'用户名长度必须是 2-6 位'
                    },
                    // callback 专门用于回调的提示
                    callback:{
                        message:"用户名不存在"
                    }
                }
            },
            password:{
                validators:{
                    // 不能为空
                    notEmpty:{
                        message:'密码不能为空'
                    },
                    // 长度校验
                    stringLength:{
                        min:6,
                        max:12,
                        message:'密码长度必须是 6-12 位'
                    },
                    // callback 用于回调的提示
                    callback:{
                        message:"密码错误"
                    }
                }
            }
        }
    })

    // 表单校验账号密码是否正确  发送 ajax 向后台发送请求
    $('#form').on("success.form.bv" , function (e) { 
        // 阻止默认的提交
        e.preventDefault();
        // 发送 ajax 
        $.ajax({
            type: 'post' ,
            url:'/employee/employeeLogin' ,
            dataType: 'json' ,
            data: $('#form').serialize(),
            success:function (info) { 
                console.log(info) ;
                if(info.error == 1000){
                    $('#form').data("bootstrapValidator").updateStatus("username","INVALID" , "callback");
                    return ;
                }
                if(info.error == 1001){
                    $('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback") ;
                    return ;
                }
                if(info.success){
                    // 跳转到首页
                    location.href = "index.html" ;
                    return ;
                }
             }
        })
    })

    // 重置功能的解决
    /**
     * $('#form).data("bootstrapValidator") 创建插件实力
     * resetForm() ; 不传参  只重置校验状态
     * resetForm(true) ; 传true  内容和状态都重置
     */ 
    $('[type="reset"]').click(function () { 
        $('#form').data("bootstrapValidator").resetForm() ;
     })
 })
