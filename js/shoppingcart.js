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
                } else {
                    window.location.href = "productlist.html";
                }
            },
            error: function (error) {
                alert("请检查网络");
            }
        })
    }

    //事件委托绑定注销事件
    $("#header").on('click', 'a.user_quit', function (e) {
        e.preventDefault();
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
    })

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
                            <input type="hidden" value="${obj.productid}"/>
                            <div><img src="${obj.pic}" alt=""/></div>
                        </td>
                        <td><a href="">${obj.pname}</a></td>
                        <td>${obj.price}</td>
                        <td>
                            <button>-</button><input data-id="${obj.productid}" type="text" value="${obj.count}"/><button>+</button>
                        </td>
                        <td><span>￥${obj.count * obj.price}</span></td>
                        <td><a href="${obj.productid}">删除</a></td>
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
    function cartDel() {
        $('#cart').on('click', 'a:contains("删除")', function (e) {
            e.preventDefault();
            var pid = $(this).attr('href');
            var that = this;
            $.ajax({
                type: 'get',
                url: 'data/del_cart.php',
                data: { uid: getCookieVal('uid'), pid: pid },
                success: function (data) {
                    if (data > 0) {
                        alert("删除成功!");
                        $(that).parent().parent().remove();
                        updateTotal();
                    } else {
                        alert("删除失败!");
                    }
                },
                error: function (error) {
                    console.log("请检查网络！")
                }
            })

        })
    }
    //点击加减按钮更新购物车的数量
    $('#cart tbody').on('click', 'button', function () {
        var btn = $(this);
        //获取小计
        var stotal = btn.parent().next().children().first();
        //获取单价
        var price = btn.parent().prev();
        if (btn.text() == '+') {
            btn.prev().val(parseInt(btn.prev().val()) + 1);
            stotal.text("￥" + (parseFloat(price.text()) * parseInt(btn.prev().val())));
            var pid = btn.prev().data('id');
            //更新数据库
            updateCartNum(1,getCookieVal('uid'),pid);
        } else {
            if (parseInt(btn.next().val()) <= 1) {
                return;
            } else {
                btn.next().val(parseInt(btn.next().val()) - 1);   
                stotal.text("￥" + (parseFloat(price.text()) * parseInt(btn.next().val())));
                var pid = btn.next().data('id');
                //更新数据库
                updateCartNum(-1,getCookieVal('uid'),pid);
            }

            // updateCartNum(-1);
        }
        updateTotal();
    });

    // updateCartNum(num);
    /**
     * 
     * @param {*1 为增加 -1为减少} num 
     */
    function updateCartNum(num,uid,pid) {
        $.ajax({
            type:'get',
            url:'data/update_cart.php',
            data:{count:num,uid:uid,pid:pid},
            success:function(data){
                // if(data>0){
                //     alert("添加成功");
                // }else{
                //     alert("添加失败");
                // }
            },
            error:function(error){
                alert("请检查网络");
            }
        })
    }
    
    $('#cart tbody').on('click',"input[type='checkbox']",function(){
        updateTotal();
        //如果选中的按钮和按钮总数量相等
        if($("#cart tbody input[type='checkbox']:checked").length==$("#cart tbody input[type='checkbox']").length&&$('#selAll').not("checked")){
            //选中全选按钮
            $('#selAll').prop('checked',true);
        }else{
            //取消全选按钮
            $('#selAll').prop('checked',false);
        }
    })
    //点击全选按钮
    $('#selAll').click(function(){
        //不能用attr
        $("#cart tbody input[type='checkbox']").prop('checked',this.checked);
        updateTotal();
    })

    //更新购物车总价
    function updateTotal(){
        var arr = $("#cart tbody input[type='checkbox']:checked");
        var total = 0;
        for(var i=0;i<arr.length;i++){
            var checkbox = arr[i];
            var stotal = parseInt($(checkbox).parent().parent().children().eq(-2).children().text().substr(1));
            total += stotal;
        }
        $("#cart_footer .total").text(total.toFixed(2));
    }
    
})