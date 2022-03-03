<?php
	require 'koneksi.php';
	$id = $_POST['id'];
	$sql = "select created_stok from stok where id_stok = $id";
    $result = $conn->query($sql);
	$row = mysqli_fetch_array($result);
	
	$menu_id = $_POST['menu'];
    $bahan_id = $_POST['bahan'];
    $jumlah = $_POST['jumlah'];
	date_default_timezone_set('Asia/Jakarta');
	$updated_at = date("Y-m-d h:i:s A");
	$created_at = $row['created_stok'];
    $sql = "UPDATE `stok` 
	SET `id_menu` = '$menu_id', `id_bahan` = '$bahan_id', `jumlah_stok` = '$jumlah', `updated_stok` = '$updated_at', `created_stok` = '$created_at' WHERE id_stok = $id";
    if (mysqli_query($conn, $sql)) {
		echo json_encode(array("statusCode"=>200));
	} 
	else {
		echo json_encode(array("statusCode"=>201));
	}
	mysqli_close($conn);
?>