<?php
    header('Content-type:text/plain,charset=utf-8');
    session_start();
    @$uname = $_REQUEST['uname'] or die('uname');
    @$upwd = $_REQUEST['upwd'] or die('upwd');
    $_SESSION['loginstate'] = 0;
    
    require('init.php');

    $sql = "SELECT uname,upwd FROM t_login WHERE uname = '$uname' and upwd = '$upwd'";
    $result = mysqli_query($conn,$sql);
   
    $row = mysqli_fetch_assoc($result);
    if($row){
        $_SESSION['uname'] = $uname;
        $_SESSION['upwd'] = $upwd;
        $_SESSION['loginstate'] = 1;
        echo $uname;
    }else{
        //用户帐号密码不匹配
        echo -1;
    }
?>