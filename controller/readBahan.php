<?php
    require 'koneksi.php';

    $sql = 'SELECT id_bahan id, nama_bahan nama, stok_bahan stok, satuan FROM bahan';
    $result = $conn->query($sql);
    while($row = mysqli_fetch_array($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
?>