<?php
	require 'koneksi.php';
	$id = $_POST['id'];
	$sql = "select created_at from stok where id = $id";
    $result = $conn->query($sql);
	$row = mysqli_fetch_array($result);
	
	$menu_id = $_POST['menu'];
    $bahan_id = $_POST['bahan'];
    $jumlah = $_POST['jumlah'];
	date_default_timezone_set('Asia/Jakarta');
	$updated_at = date("Y-m-d h:i:s A");
	$created_at = $row['created_at'];
    $sql = "UPDATE `stok` 
	SET `menu_id` = '$menu_id', `bahan_id` = '$bahan_id', `jumlah` = '$jumlah', `updated_at` = '$updated_at', `created_at` = '$created_at' WHERE id = $id";
    if (mysqli_query($conn, $sql)) {
		echo json_encode(array("statusCode"=>200));
	} 
	else {
		echo json_encode(array("statusCode"=>201));
	}
	mysqli_close($conn);
?>