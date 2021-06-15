<?php
    require 'koneksi.php';
    $sql = "select max(id)+1 as id from pesanan";
    $result = $conn->query($sql);
    $row = mysqli_fetch_array($result);

    $id = $row['id'];
    $menu_id = $_POST['pesanan'];
    $user_id = $_POST['pelanggan'];
    $jumlah = $_POST['jumlah'];
    $tanggal = $_POST['tanggal'];
    date_default_timezone_set('Asia/Jakarta');
    $updated_at = date("Y-m-d h:i:s A");
    $created_at = date("Y-m-d h:i:s A");

    $sql = "INSERT INTO pesanan (id, menu_id, user_id, jumlah, tanggal, updated_at, created_at)
    VALUES ($id, '$menu_id', '$user_id', '$jumlah', '$tanggal', '$updated_at', '$created_at')";
    if (mysqli_query($conn, $sql)) {
        echo json_encode(array("statusCode"=>200));
	} 
	else {
		echo json_encode(array("statusCode"=>201));
	}
	mysqli_close($conn);
?>