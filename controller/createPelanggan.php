<?php
    require 'koneksi.php';
    $sql = "select (case when (max(id)) is null then 1 else (max(id)+1) end) as id from users";
    $result = $conn->query($sql);
    $row = mysqli_fetch_array($result);

    $id = $row['id'];
    $username = $_POST['username'];
    $nohp = $_POST['nohp'];
    $password = $_POST['password'];
    date_default_timezone_set('Asia/Jakarta');
    $updated_at = date("Y-m-d h:i:s A");
    $created_at = date("Y-m-d h:i:s A");

    $sql = "select username from users where username = '$username'";
    $result = $conn->query($sql);
    $row2 = mysqli_fetch_array($result);
    
    if($row2 == null){
        $sql = "INSERT INTO users (id, username, nohp, password, updated_at, created_at)
        VALUES ($id, '$username', '$nohp','$password', '$updated_at', '$created_at')";
        mysqli_query($conn, $sql);

        $sql = "select id from users where username = '$username'";
        $result = $conn->query($sql);
        $row3 = mysqli_fetch_array($result);

        $sql = "select max(id)+1 as id from user_role";
        $result = $conn->query($sql);
        $row4 = mysqli_fetch_array($result);

        $user_id = $row3['id'];
        $user_role_id = $row4['id'];

        $sql = "INSERT INTO user_role (id, user_id, role_id)
        VALUES ($user_role_id, $user_id, 2)";
        if (mysqli_query($conn, $sql)) {
            echo json_encode(array("statusCode"=>200));
        } 
        else {
            echo json_encode(array("statusCode"=>201));
        }
    }else{
        echo json_encode(array("statusCode"=>202));
    }
	mysqli_close($conn);
?>