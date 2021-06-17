<?php
    require 'koneksi.php';

    $sql = 'select a.id, a.username, a.password from users a join user_role b on a.id = b.user_id where b.role_id = 2';
    $result = $conn->query($sql);
    while($row = mysqli_fetch_array($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
?>