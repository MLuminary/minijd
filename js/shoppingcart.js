$(function () {

    //加载头文件和尾文件
    $('#header').load('data/header.php', function () {
        $('#my_jd').click(function () {
            window.location.href = "productlist.html";
        })
    });
    $('#footer').load('data/footer.php');

    //检验是否登录过
    checkLogin();
    function checkLogin() {
        $.ajax({
            type: 'get',
            url: 'data/login_check.php',
            success: function (data) {
                //如果登录过
                if (data != -1) {
                    //用户信息和退出按钮出现并绑定事件
                    $('.user').show();
                    $('.user .user_name').text(data);
                    //登录按钮消失
                    $('.login_show').hide();
                    $('.modal').hide();
                    //注销登录
                    $('.user_quit').click(function () {
                        $.ajax({
                            url: 'data/login_out.php',
                            success: function (data) {
                                window.location.href = "productlist.html";
                            },
                            error: function (error) {
                                alert("请检查网络!")
                            }
                        })
                    })
                } else {
                    window.location.href = "productlist.html";
                }
            },
            error: function (error) {
                alert("请检查网络");
            }
        })
    }

})