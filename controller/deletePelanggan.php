<?php
    require 'koneksi.php';
    $id = $_POST['id'];

	$sql = "select id from pesanan where user_id = $id limit 1";
    $result = $conn->query($sql);
	$row = mysqli_fetch_array($result);

	if($row != null){
		echo json_encode(array("statusCode"=>202));
	}else{
		$sql = "DELETE FROM users WHERE id = $id";
		mysqli_query($conn, $sql);
		$sql = "DELETE FROM user_role WHERE user_id = $id";
		if (mysqli_query($conn, $sql)) {
			echo json_encode(array("statusCode"=>200));
		} 
		else {
			echo json_encode(array("statusCode"=>201));
		}
	}
	mysqli_close($conn);
?>