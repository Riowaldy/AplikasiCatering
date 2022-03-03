<?php
    require 'koneksi.php';

    $sql = '
            select id_menu id, nama_menu nama from menu
            ';
    $result = $conn->query($sql);
    while($row = mysqli_fetch_array($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
?>