
// 登录拦截  如果未登录就拦截到登陆页

$.ajax({
    type: "get" ,
    dataType: "json" ,
    url:"/employee/checkRootLogin" ,
    success: function (info) { 
        if(info.error == 400){
            // 未登录 跳转登陆页
            location.href = "login.html" ;
        }
        if(info.success){
            console.log('用户已登录') ;
        }
     }
})