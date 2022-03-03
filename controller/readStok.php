<?php
    require 'koneksi.php';

    $sql = '
            SELECT a.id_stok id, b.nama_menu menu, c.nama_bahan bahan, 
            a.jumlah_stok jumlah, b.id_menu menuid, c.id_bahan bahanid 
            FROM stok a JOIN menu b on a.id_menu = b.id_menu 
            JOIN bahan c on a.id_bahan = c.id_bahan 
            order by a.id_stok
            ';
    $result = $conn->query($sql);
    while($row = mysqli_fetch_array($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
?>