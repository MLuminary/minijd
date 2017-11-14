<?php
//注销登录
session_start();
$_SESSION['loginstate'] = 0;
unset($_SESSION['loginstate']);

?>