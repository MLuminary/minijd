$(function () {


    //加载头文件 header.php
    //加载脚文件 footer.php
    $("#header").load("data/header.php", function () {
        $('#settle_up').click(function () {
            window.location.href = "shoppingcart.html";
        })
    });
    $("#footer").load("data/footer.php");



    //检查是否登录
    checkLogin();
    function checkLogin() {
        $.ajax({
            type: 'get',
            url: 'data/login_check.php',
            success: function (data) {
                if (data != -1) {
                    $('.modal').hide();
                    $('.user').show();
                    $('.user .user_name').text(data);
                    //登录按钮消失
                    $('.login_show').hide();
                    $('.modal').hide();
                }
            },
            error: function (error) {
                alert("请检查网络！");
            }
        })
    }


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
                    //将用户和名字存入cookie
                    document.cookie = 'uid=' + data;
                    document.cookie = 'uname=' + u;

                    $('.user').show();
                    $('.user .user_name').text(u);
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
    //事件委托绑定注销事件
    $("#header").on('click', 'a.user_quit', function (e) {
        e.preventDefault();
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
                    alert("请检查网络!");
                }
            })
        })

    })

    //加载商品
    //一页需要加载的商品的个数
    var num = 8;
    loadProduct(1);
    function loadProduct(page) {
        //加载商品
        $.ajax({
            type: 'get',
            url: 'data/product_list.php',
            dataType: 'json',
            data: { page: page, num: num },
            success: function (data) {
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    var obj = data[i];
                    var imgSrc = obj.pic,
                        Price = obj.price,
                        des = obj.pname,
                        pid = obj.pid;
                    html +=
                        `<li>
                            <a href=""><img src="${imgSrc}" alt=""/></a>
                            <p>￥${Price}</p>
                            <h1><a href="">${des}</a></h1>
                            <div>
                                <a href="" class="contrast"><i></i>对比</a>
                                <a href="" class="p-operate"><i></i>关注</a>
                                <a href="${pid}" class="addcart"><i></i>加入购物车</a>
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
    //加载页码
    loadPageNum();
    function loadPageNum() {
         //加载a标签个数
         $.ajax({
            type: 'get',
            url: 'data/product_count.php',
            success: function (data) {
                var pageNum = Math.ceil(data / num);
                var html = `<li  class="active"><a href="#">1</a></li>`;
                if (pageNum > 1) {
                    for (var i = 2; i <= pageNum; i++) {
                        html += `<li><a href="#">${i}</a></li>`;
                    }
                }
                $('#plist .pager').html(html);
            },
            error: function (error) {
                alert("请检查网络");
            }
        })
    }


    //点击添加到购物车
    //利用事件委托
    $("#plist").on('click', 'a.addcart', function (e) {
        //取消默认事件
        e.preventDefault();
        // 获得pid
        var pid = $(this).attr('href');
        $.ajax({
            type: 'post',
            url: 'data/add_cart.php',
            data: { uid: getCookieVal('uid'), pid: pid },
            success: function (data) {
                if (data > 0) {
                    alert("添加成功!该商品己购买" + data);
                } else {
                    alert("添加失败");
                }
            },
            error: function (error) {
                alert("请检查网络");
            }
        })
    })

    //分页查询
    $('#plist .pager').on('click', 'a', function (e) {
        e.preventDefault();
        var page = $(this).text();
        loadProduct(page);
        $(this).parent().addClass('active').siblings().removeClass('active');
    })



})
