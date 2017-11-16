<?php
  header('content-type:text/plain;charset=utf-8');
  require('init.php');

  $sql = "SELECT count(*) count FROM jd_product";
  $result = mysqli_query($conn,$sql);
  $row = mysqli_fetch_assoc($result);

  echo $row['count'];
?>