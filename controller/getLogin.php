<?php
    require 'koneksi.php';
    session_start();
    if($_POST['type']==2){
        $username = $_POST['username'];
        $password = $_POST['password'];
        $check=mysqli_query($conn,"select * from users where username = '$username' and password = '$password'");
        if (mysqli_num_rows($check)>0)
        {
            $_SESSION['username'] = $username;
            $_SESSION['logged'] = true;
            date_default_timezone_set('Asia/Jakarta');
            $_SESSION['timelogin'] = date("Y-m-d h:i:s A");
            echo json_encode(array("statusCode"=>200, "username"=>$_SESSION['username'],
                                "logged"=>$_SESSION['logged'], "timelogin"=>$_SESSION['timelogin']));
        }
        else{
            echo json_encode(array("statusCode"=>201));
        }
        mysqli_close($conn);
    }
?>