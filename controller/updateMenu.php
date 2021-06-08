<?php
	require 'koneksi.php';
	$id = $_POST['id'];
	$sql = "select created_at from menu where id = $id";
    $result = $conn->query($sql);
	$row = mysqli_fetch_array($result);
	
	$nama = $_POST['nama'];
    $harga = $_POST['harga'];
	date_default_timezone_set('Asia/Jakarta');
	$updated_at = date("Y-m-d h:i:s A");
	$created_at = $row['created_at'];
    $sql = "UPDATE `menu` 
	SET `nama` = '$nama', `harga` = '$harga', `updated_at` = '$updated_at', `created_at` = '$created_at' WHERE id = $id";
    if (mysqli_query($conn, $sql)) {
		echo json_encode(array("statusCode"=>200));
	} 
	else {
		echo json_encode(array("statusCode"=>201));
	}
	mysqli_close($conn);
?>