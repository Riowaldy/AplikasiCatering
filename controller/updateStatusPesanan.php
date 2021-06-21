<?php
	require 'koneksi.php';
	$id = $_POST['id'];
	$sql = "select created_at from pesanan where id = $id";
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
	$created_at = $row['created_at'];
    $sql = "UPDATE `pesanan` 
	SET `status` = '$statusupd', `updated_at` = '$updated_at', `created_at` = '$created_at' WHERE id = $id";
    if (mysqli_query($conn, $sql)) {
		echo json_encode(array("statusCode"=>200));
	} 
	else {
		echo json_encode(array("statusCode"=>201));
	}
	mysqli_close($conn);
?>