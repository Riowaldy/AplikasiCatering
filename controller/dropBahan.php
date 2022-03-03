<?php
    require 'koneksi.php';

    $sql = '
            select id_bahan id, nama_bahan nama, satuan from bahan
            ';
    $result = $conn->query($sql);
    while($row = mysqli_fetch_array($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
?>