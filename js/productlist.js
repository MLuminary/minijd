$(function () {


    //加载头文件 header.php
    //加载脚文件 footer.php
    $("#header").load("data/header.php", function () {
        $('#settle_up').click(function () {
            window.location.href = "shoppingcart.html";
        })
    });
    $("#footer").load("data/footer.php");


    //密码验证
    var btn_login = $("#bt-login");

    btn_login.click(function () {
        //获取输入框的用户名和密码
        var u = $('#uname').val(),
            p = $('#upwd').val()
        //登录
        $.ajax({
            type: 'get',
            url: 'data/login_on.php',
            data: { uname: u, upwd: p },
            success: function (data) {
                if (data == -1) {
                    $('p.alert').html("用户名或密码有误");
                } else {
                    //用户信息和退出按钮出现并绑定事件
                    $('.user').show();
                    $('.user .user_name').text(data);
                    //注销登录
                    $('.user_quit').click(function () {
                        $.ajax({
                            url: 'data/login_out.php',
                            success: function (data) {
                                $('.user').hide();
                                $('.login_show').show();
                                $('.modal').show();
                            },
                            error: function (error) {
                                alert("请检查网络!")
                            }
                        })
                    })
                    //登录按钮消失
                    $('.login_show').hide();
                    $('.modal').hide();
                }
            },
            error: function (error) {
                alert("请检查网络")
            }
        })
    })

    //加载商品
    loadProduct();
    function loadProduct() {
        $.ajax({
            type: 'get',
            url: 'data/product_list.php',
            dataType: 'json',
            success: function (data) {
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    var obj = data[i];
                    var imgSrc = obj.pic,
                        Price = obj.price,
                        des = obj.pname;
                    html +=
                    `<li>
                            <a href=""><img src="${imgSrc}" alt=""/></a>
                            <p>￥${Price}</p>
                            <h1><a href="">${des}</a></h1>
                            <div>
                                <a href="" class="contrast"><i></i>对比</a>
                                <a href="" class="p-operate"><i></i>关注</a>
                                <a href="" class="addcart"><i></i>加入购物车</a>
                            </div>
                    </li>`
                }
                $('#plist ul').html(html);
            },
            error: function (error) {
                // console.log(error);
                alert("请检查网络");
            }
        })
    }





})
