<?php
    header("Content-Type:text/plain,charset=utf-8");
    // 传入用户的编号和购买商品的编号
    @$uid = $_REQUEST['uid'] or die("-1");
    @$pid = $_REQUEST['pid'] or die("-2");

    require('init.php');
    //先查询当前用户购物车中是否有该商品
    $sql = "SELECT * FROM jd_cart WHERE uid = $uid and productid = $pid";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($result);
    $count = 0;
    if(isset($row)){
        //如果有此商品
        //在其数量上加1
        $sql = "UPDATE jd_cart SET count=count+1 WHERE uid = $uid and productid = $pid";
        $result = mysqli_query($conn,$sql);
        $count = $row['count'] + 1;
    }else{ 
        //如果没有此商品
        //在表中插入数据
        $sql = "INSERT INTO jd_cart VALUES(null,$uid,$pid,1)";
        $result = mysqli_query($conn,$sql);
        $count = 1;
    }
    echo $count;

?>