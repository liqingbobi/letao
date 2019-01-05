// 进度条
$(document).ajaxStart(function() {
    // 开启进度条
    NProgress.start();
  })
  $(document).ajaxStop(function() {
    // 模拟网络延迟
    setTimeout(function() {
      // 结束进度条
      NProgress.done();
    }, 500)
  })

// 入口函数
$(function () {

    // 左侧二级菜单切换功能
    $('.lt-left .category').click(function () {
        // 切换把兄弟元素显示
        $(this).next().stop().slideToggle();
    })

  // 2. 左边侧边栏切换功能
  $('.ico_menu').click(function() {
    $('.lt-left').toggleClass("hidemenu");
    $('.lt-right-top').toggleClass("hidemenu");
    $('.lt-right').toggleClass("hidemenu");
  })

    // 首页的退出功能
    $('.ico_logout').click(function () {
        // 让拟态框显示 show 隐藏 hide
        $('#logoutModal').modal('show');
    })
    // (2) 点击退出按钮, 发送退出请求, 实现退出
    $('#logoutBtn').click(function () {
        // 发送 ajax 请求
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.success) {
                    // 退出成功, 跳到登陆页
                    location.href = "login.html";
                }
            }
        })

    })
})