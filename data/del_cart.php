<?php
    header("content-type:text/plain;charset=utf-8");

    require('init.php');
    //接受用户id和商品id
    @$uid = $_REQUEST['uid'] or die("-1");
    @$pid = $_REQUEST['pid'] or die("-2");

    $sql = "DELETE FROM jd_cart WHERE uid=$uid AND productid=$pid";
    $result = mysqli_query($conn,$sql);
    
    if($result){
        //代表删除成功
        echo "1";
    }

?>