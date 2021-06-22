<?php
    require 'koneksi.php';
    session_start();
    $userid = $_SESSION['userid'];
    $role = $_SESSION['role'];

    if($role == "2"){
        $whereuser = " and c.id = '$userid'";
    }else {
        $whereuser = "";
    }

    $sql = "
            select c.id, c.username nama from role a
            join user_role b on a.id = b.role_id
            join users c on b.user_id = c.id
            where a.id = 2 $whereuser
            order by c.id 
            ";
    $result = $conn->query($sql);
    while($row = mysqli_fetch_array($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
?>