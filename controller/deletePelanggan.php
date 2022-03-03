<?php
    require 'koneksi.php';
    $id = $_POST['id'];

	$sql = "select id_pesanan from pesanan where id_users = $id limit 1";
    $result = $conn->query($sql);
	$row = mysqli_fetch_array($result);

	if($row != null){
		echo json_encode(array("statusCode"=>202));
	}else{
		$sql = "DELETE FROM users WHERE id_users = $id";
		mysqli_query($conn, $sql);
		$sql = "DELETE FROM user_role WHERE id_users = $id";
		if (mysqli_query($conn, $sql)) {
			echo json_encode(array("statusCode"=>200));
		} 
		else {
			echo json_encode(array("statusCode"=>201));
		}
	}
	mysqli_close($conn);
?>