<?php
    require 'koneksi.php';
    session_start();
    $userid = $_SESSION['userid'];
    $role = $_SESSION['role'];

    if($role == "2"){
        $whereuser = " and c.id_users = '$userid'";
    }else {
        $whereuser = "";
    }

    $sql = "
            select c.id_users id, c.username nama from role a
            join user_role b on a.id_role = b.id_role
            join users c on b.id_users = c.id_users
            where a.id_role = 2 $whereuser
            order by c.id_users
            ";
    $result = $conn->query($sql);
    while($row = mysqli_fetch_array($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
?>