<?php
    require 'koneksi.php';

    $sql = '
            select nama, stok, satuan from bahan
            where stok < 0
            ';
    $result = $conn->query($sql);
    while($row = mysqli_fetch_array($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
?>