<?php
    require 'koneksi.php';

    $sql = '
            select nama_bahan nama, stok_bahan stok, satuan from bahan
            where stok_bahan < 0
            ';
    $result = $conn->query($sql);
    while($row = mysqli_fetch_array($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
?>