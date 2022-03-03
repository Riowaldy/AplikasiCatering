<?php
	require 'koneksi.php';
	$id = $_POST['id'];
	$sql = "select created_pesanan from pesanan where id_pesanan = $id";
    $result = $conn->query($sql);
	$row = mysqli_fetch_array($result);
	
	$status = $_POST['status'];

    if($status == "0"){
        $statusupd = "1";
    }else{
        $statusupd = "0";
    }
	date_default_timezone_set('Asia/Jakarta');
	$updated_at = date("Y-m-d h:i:s A");
	$created_at = $row['created_pesanan'];
    $sql = "UPDATE `pesanan` 
	SET `status_pesanan` = '$statusupd', `updated_pesanan` = '$updated_at', `created_pesanan` = '$created_at' WHERE id_pesanan = $id";
    if (mysqli_query($conn, $sql)) {
		echo json_encode(array("statusCode"=>200));
	} 
	else {
		echo json_encode(array("statusCode"=>201));
	}
	mysqli_close($conn);
?>