<?php
    require 'koneksi.php';

    $sql = '
            SELECT a.id, b.nama menu, c.nama bahan, 
            a.jumlah, b.id menuid, c.id bahanid 
            FROM stok a JOIN menu b on a.menu_id = b.id 
            JOIN bahan c on a.bahan_id = c.id 
            order by a.id
            ';
    $result = $conn->query($sql);
    while($row = mysqli_fetch_array($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
?>