<?php

session_start();

if(isset($_SESSION['loginstate'])&&$_SESSION['loginstate']==1){
    echo $_SESSION['uname'];
}else{
    echo -1;
}

?>