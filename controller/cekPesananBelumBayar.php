<?php
    require 'koneksi.php';
    session_start();
    $id = $_SESSION['userid'];
    $sql = "
            select b.nama_menu nama, c.username, a.jumlah_pesanan jumlah from pesanan a
            join menu b on a.id_menu = b.id_menu 
            join users c on a.id_users = c.id_users
            where a.status_pesanan = 0 and a.id_users = ".$id;
    $result = $conn->query($sql);
    while($row = mysqli_fetch_array($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
?>