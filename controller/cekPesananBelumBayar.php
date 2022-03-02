<?php
    require 'koneksi.php';
    session_start();
    $id = $_SESSION['userid'];
    $sql = "
            select b.nama, c.username, a.jumlah from pesanan a
            join menu b on a.menu_id = b.id 
            join users c on a.user_id = c.id
            where a.status = 0 and a.user_id = ".$id;
    $result = $conn->query($sql);
    while($row = mysqli_fetch_array($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
?>