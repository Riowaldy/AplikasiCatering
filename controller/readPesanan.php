<?php
    require 'koneksi.php';
    session_start();
    $userid = $_SESSION['userid'];
    $role = $_SESSION['role'];

    if($role == "2"){
        $whereuser = " where c.id = '$userid'";
    }else {
        $whereuser = "";
    }
    $sql = "
            SELECT a.id, b.nama pesanan, c.username pelanggan, 
            a.jumlah, (a.jumlah * b.harga) harga, a.tanggal, a.status, b.id menuid, c.id userid 
            FROM pesanan a JOIN menu b on a.menu_id = b.id 
            JOIN users c on a.user_id = c.id 
            $whereuser
            order by a.id
            ";
    
    $result = $conn->query($sql);
    while($row = mysqli_fetch_array($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
?>