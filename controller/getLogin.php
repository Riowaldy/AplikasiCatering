<?php
    require 'koneksi.php';
    require 'koneksiPDO.php';
    session_start();
    if($_POST['type']==2){
        $username = $_POST['username'];
        $password = $_POST['password'];
        // $check=mysqli_query($conn,"select a.id userid, a.username, a.password, c.id role from users a 
        // join user_role b on a.id = b.user_id 
        // join role c on b.role_id = c.id 
        // where a.username = '$username' and a.password = '$password'");
        // if (mysqli_num_rows($check)>0)
        // {
        //     $row = mysqli_fetch_array($check);
        //     $role = $row['role'];
        //     $userid = $row['userid'];
        //     $_SESSION['username'] = $username;
        //     $_SESSION['role'] = $role;
        //     $_SESSION['userid'] = $userid;
        //     $_SESSION['logged'] = true;
        //     date_default_timezone_set('Asia/Jakarta');
        //     $_SESSION['timelogin'] = date("Y-m-d h:i:s A");
        //     echo json_encode(array("statusCode"=>200, "username"=>$_SESSION['username'],
        //                         "logged"=>$_SESSION['logged'], "timelogin"=>$_SESSION['timelogin'], 
        //                         "role"=>$_SESSION['role'], "userid"=>$_SESSION['userid']));
        // }
        // else{
        //     echo json_encode(array("statusCode"=>201));
        // }
        // mysqli_close($conn);

        try {
            $sql = "select a.id_users userid, a.username, a.password, c.id_role role from users a 
            join user_role b on a.id_users = b.id_users 
            join role c on b.id_role = c.id_role 
            where a.username = :username and a.password = :password";
            $stmt = $pdo->prepare($sql); 
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':password', $password);
            $stmt->execute();
            $count = $stmt->rowCount();
            if($count == 1) {
                $check=mysqli_query($conn,"select a.id_users userid, a.username, a.password, c.id_role role from users a 
                join user_role b on a.id_users = b.id_users 
                join role c on b.id_role = c.id_role 
                where a.username = '$username' and a.password = '$password'");
                $row = mysqli_fetch_array($check);
                $role = $row['role'];
                $userid = $row['userid'];
                $_SESSION['username'] = $username;
                $_SESSION['role'] = $role;
                $_SESSION['userid'] = $userid;
                $_SESSION['logged'] = true;
                date_default_timezone_set('Asia/Jakarta');
                $_SESSION['timelogin'] = date("Y-m-d h:i:s A");

                echo json_encode(array("statusCode"=>200, "username"=>$_SESSION['username'],
                "logged"=>$_SESSION['logged'], "timelogin"=>$_SESSION['timelogin'], 
                "role"=>$_SESSION['role'], "userid"=>$_SESSION['userid']));

                mysqli_close($conn);
            }else{
                echo json_encode(array("statusCode"=>201));
            }
        }
        catch(PDOException $e) {
            echo json_encode(array("statusCode"=>201));
        }
    }
?>