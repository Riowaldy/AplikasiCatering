<?php
    require 'koneksi.php';
    $sql = "select (case when (max(id)) is null then 1 else (max(id)+1) end) as id from menu";
    $result = $conn->query($sql);
    $row = mysqli_fetch_array($result);

    $id = $row['id'];
    $nama = $_POST['nama'];
    $harga = $_POST['harga'];
    date_default_timezone_set('Asia/Jakarta');
    $updated_at = date("Y-m-d h:i:s A");
    $created_at = date("Y-m-d h:i:s A");

    $sql = "select nama from menu where nama = '$nama'";
    $result = $conn->query($sql);
    $row2 = mysqli_fetch_array($result);

    if($row2 == null){
        $sql = "INSERT INTO menu (id, nama, harga, updated_at, created_at)
        VALUES ($id, '$nama', '$harga', '$updated_at', '$created_at')";
        if (mysqli_query($conn, $sql)) {
            echo json_encode(array("statusCode"=>200));
        } 
        else {
            echo json_encode(array("statusCode"=>201));
        }
    }else{
        echo json_encode(array("statusCode"=>202));
    }
	mysqli_close($conn);
?>