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

    //展示购物车内容
    showCart();
    function showCart() {
        $.ajax({
            type: 'post',
            url: 'data/cart_list.php',
            data: { uid: getCookieVal('uid') },
            success: function (data) {
                // console.log(data);
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    var obj = data[i];
                    html += `
                    <tr>
                        <td>
                            <input type="checkbox"/>
                            <input type="hidden" value="${obj.id}"/>
                            <div><img src="${obj.pic}" alt=""/></div>
                        </td>
                        <td><a href="">${obj.pname}</a></td>
                        <td>${obj.price}</td>
                        <td>
                            <button>-</button><input type="text" value="${obj.count}"/><button>+</button>
                        </td>
                        <td><span>￥${obj.count*obj.price}</span></td>
                        <td><a href="${obj.id}">删除</a></td>
                    </tr>`
                }
                $("#cart tbody").html(html);

            },
            error: function (error) {
                alert("请检查网络");
            }
        })
    }
    //删除购物车中的商品
    cartDel();
    function cartDel(){
        $('#cart').on('click','a:contains("删除")',function(e){
            e.preventDefault();
            var pid = $(this).attr('href');
            
            
        })
    }



})