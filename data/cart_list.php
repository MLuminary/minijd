<?php
    header("content-type:application/json;charset=utf-8");
    // 获取用户的id
    @$uid = $_REQUEST['uid'] or die("uid");
    require('init.php');
    
    $sql="SELECT c.id,p.pname,p.price,p.pic,c.count FROM jd_cart c,jd_product p WHERE c.productid = p.pid AND c.uid = $uid";

    $result = mysqli_query($conn,$sql);
    $rows = mysqli_fetch_all($result,MYSQLI_ASSOC);

    echo json_encode($rows);

?>