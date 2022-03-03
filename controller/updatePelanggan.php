<?php
	require 'koneksi.php';
	$id = $_POST['id'];
	$sql = "select created_users from users where id_users = $id";
    $result = $conn->query($sql);
	$row = mysqli_fetch_array($result);
	
	$username = $_POST['username'];
	$nohp = $_POST['nohp'];
    $password = $_POST['password'];
	date_default_timezone_set('Asia/Jakarta');
	$updated_at = date("Y-m-d h:i:s A");
	$created_at = $row['created_users'];
    $sql = "UPDATE `users` 
	SET `username` = '$username', `nohp` = '$nohp',`password` = '$password', `updated_users` = '$updated_at', `created_users` = '$created_at' WHERE id_users = $id";
    if (mysqli_query($conn, $sql)) {
		echo json_encode(array("statusCode"=>200));
	} 
	else {
		echo json_encode(array("statusCode"=>201));
	}
	mysqli_close($conn);
?>