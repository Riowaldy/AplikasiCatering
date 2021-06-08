<?php
session_start();
    if(isset($_SESSION['username']) && !empty($_SESSION['username'])){
        echo json_encode(array("statusCode"=>200, "username"=>$_SESSION['username'], 
                        "logged"=>$_SESSION['logged'], "timelogin"=>$_SESSION['timelogin']));
    }else{
        echo json_encode(array("statusCode"=>201));
    }
?>