<?php
    header("Content-Type:application/json;charset=utf-8");
    require('init.php');

    $sql = 'SELECT * FROM jd_product';
    $result = mysqli_query($conn,$sql);
    
    $rows = mysqli_fetch_all($result,1);

    echo json_encode($rows);
    
?>