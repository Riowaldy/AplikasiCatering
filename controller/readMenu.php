<?php
    require 'koneksi.php';

    $sql = 'SELECT id, nama, harga, gambar FROM menu';
    $result = $conn->query($sql);
    while($row = mysqli_fetch_array($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
?>