<?php
    require 'koneksi.php';
    $sql = "
            SELECT a.id_pesanan id, b.nama_menu pesanan, c.username pelanggan, 
            a.jumlah_pesanan jumlah, (a.jumlah_pesanan * b.harga_menu) harga, a.tanggal_pesanan tanggal, a.status_pesanan status, 
            b.id_menu menuid, c.id_users userid, c.nohp 
            FROM pesanan a JOIN menu b on a.id_menu = b.id_menu
            JOIN users c on a.id_users = c.id_users
            order by a.id_pesanan
            ";
    
    $result = $conn->query($sql);
    while($row = mysqli_fetch_array($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
?>