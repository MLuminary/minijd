<?php
    header("content-type:text/plain;charset=utf-8");
    require('init.php');

    @$count = $_REQUEST['count'] or die('-1');
    @$uid = $_REQUEST['uid'] or die('-2');
    @$pid = $_REQUEST['pid'] or die('-3');


    $sql = "UPDATE jd_cart SET count=count+$count WHERE uid = $uid AND productid = $pid";
    $result = mysqli_query($conn,$sql);

    if($result){
        echo "1";
    }

?>