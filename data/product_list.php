<?php
    header("Content-Type:application/json;charset=utf-8");
    require('init.php');
    @$page = $_REQUEST['page'] or die("-1");
    //一页显示的个数
    @$num = $_REQUEST['num'] or die("-2");
    
    $startPage = ($page-1)*$num;
    $sql = "SELECT * FROM jd_product LIMIT $startPage,$num";
    $result = mysqli_query($conn,$sql);
    
    $rows = mysqli_fetch_all($result,1);

    echo json_encode($rows);
    
?>