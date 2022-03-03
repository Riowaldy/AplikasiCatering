<?php
    require 'koneksi.php';

    $sql = 'select a.id_users, a.username, a.nohp, a.password from users a join user_role b on a.id_users = b.id_users where b.id_role = 2';
    $result = $conn->query($sql);
    while($row = mysqli_fetch_array($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
?>