<?php
    require 'koneksi.php';
    $id = $_POST['id'];

	$sql = "select id_pesanan from pesanan where id_menu = $id limit 1";
    $result = $conn->query($sql);
	$row = mysqli_fetch_array($result);

	$sql2 = "select id_stok from stok where id_menu = $id limit 1";
    $result2 = $conn->query($sql2);
	$row2 = mysqli_fetch_array($result2);

	if($row != null){
		echo json_encode(array("statusCode"=>202));
	}else{
		if($row != null){
			echo json_encode(array("statusCode"=>203));
		}else{
			$sql = "DELETE FROM menu WHERE id_menu = $id";
			if (mysqli_query($conn, $sql)) {
				echo json_encode(array("statusCode"=>200));
			} 
			else {
				echo json_encode(array("statusCode"=>201));
			}
		}
	}
	mysqli_close($conn);
?>