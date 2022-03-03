<?php
	require 'koneksi.php';
	$id = $_POST['id'];
	$sql = "select created_bahan from bahan where id_bahan = $id";
    $result = $conn->query($sql);
	$row = mysqli_fetch_array($result);
	
	$nama = $_POST['nama'];
    $stok = $_POST['stok'];
    $satuan = $_POST['satuan'];
	date_default_timezone_set('Asia/Jakarta');
	$updated_at = date("Y-m-d h:i:s A");
	$created_at = $row['created_bahan'];
    $sql = "UPDATE `bahan` 
	SET `nama_bahan` = '$nama', `stok_bahan` = '$stok', `satuan` = '$satuan', `updated_bahan` = '$updated_at', `created_bahan` = '$created_at' WHERE id_bahan = $id";
    if (mysqli_query($conn, $sql)) {
		echo json_encode(array("statusCode"=>200));
	} 
	else {
		echo json_encode(array("statusCode"=>201));
	}
	mysqli_close($conn);
?>