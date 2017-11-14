$(function(){
    //加载头文件 header.php
   //加载脚文件 footer.php
   $("#header").load("data/header.php");
   $("#footer").load("data/footer.php");


    //密码验证
    var btn_login = $("#bt-login");
    btn_login.click(function(){
        //获取输入框的用户名和密码
        var u = $('#uname').val(),
            p = $('#upwd').val()

        $.ajax({
            type:'get',
            url:'data/login_check.php',
            data:{uname:u,upwd:p},
            success:function(data){
                if(data==-1){
                    $('p.alert').html("用户名或密码有误");
                }else{
                    $('.user').show();
                    $('.user .user_name').text(data);
                    $('.login_show').hide();
                    $('.modal').hide();
                }
            },
            error:function(error){
                alert("请检查网络")
            }
        })
    })


})