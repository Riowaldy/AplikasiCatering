<?php
	require 'koneksi.php';
	$id = $_POST['id'];
	$sql = "select created_at from pesanan where id = $id";
    $result = $conn->query($sql);
	$row = mysqli_fetch_array($result);
	
	$menu_id = $_POST['pesanan'];
    $user_id = $_POST['pelanggan'];
    $jumlah = $_POST['jumlah'];
    $tanggal = $_POST['tanggal'];
	date_default_timezone_set('Asia/Jakarta');
	$updated_at = date("Y-m-d h:i:s A");
	$created_at = $row['created_at'];

	$sql = "select menu_id, jumlah from pesanan
            where id = '$id'";
	$result = $conn->query($sql);
	$row = mysqli_fetch_assoc($result);
	$jumlahbefore = $row["jumlah"];
	$menu_id = $row["menu_id"];

	if($jumlahbefore == $jumlah){
		$sql = "UPDATE `pesanan` 
		SET `menu_id` = '$menu_id', `user_id` = '$user_id', `jumlah` = '$jumlah', `tanggal` = '$tanggal', `updated_at` = '$updated_at', `created_at` = '$created_at' WHERE id = $id";
		if (mysqli_query($conn, $sql)) {
			echo json_encode(array("statusCode"=>200));
		} 
		else {
			echo json_encode(array("statusCode"=>201));
		}
	}else if ($jumlah > $jumlahbefore){
		$sql = "select menu_id, bahan_id, jumlah from stok
            where menu_id = '$menu_id'";
		$result2 = $conn->query($sql);
		while($row2 = mysqli_fetch_assoc($result2))
		{
			$data[] = $row2;
		}
		$hitung = 0;
		if(count($data) > 0){
			for ($x = 0; $x < count($data); $x++) {
				$bahan_id = $data[$x]["bahan_id"];
				$jumlahawal = $data[$x]["jumlah"];
				$jumlahmin = $jumlah - $jumlahbefore;
				$jumlahakhir = $jumlahawal * $jumlahmin;

				$sql3 = "select stok from bahan
				where id = '$bahan_id'";
				$result3 = $conn->query($sql3);
				$row3 = mysqli_fetch_assoc($result3);

				$stokbahan = $row3["stok"];

				$stokupdate = $stokbahan - $jumlahakhir;
				$hitung++;
				$arrstok[] = $stokupdate;
				$arrbahan[] = $bahan_id;
			}
			if($hitung == count($data)){
				for ($x = 0; $x < count($arrstok); $x++) {
					$sql = "UPDATE `bahan` 
					SET `stok` = '$arrstok[$x]', `updated_at` = '$updated_at' WHERE id = $arrbahan[$x]";
					mysqli_query($conn, $sql);

					$sql = "UPDATE `pesanan` 
					SET `menu_id` = '$menu_id', `user_id` = '$user_id', `jumlah` = '$jumlah', `tanggal` = '$tanggal', `updated_at` = '$updated_at', `created_at` = '$created_at' WHERE id = $id";
					mysqli_query($conn, $sql);
					
				}
				echo json_encode(array("statusCode"=>200));
			}
			else{
				echo json_encode(array("statusCode"=>202));
			}
		}
		else {
			echo json_encode(array("statusCode"=>201));
		}
	}else if ($jumlah < $jumlahbefore){
		$sql = "select menu_id, bahan_id, jumlah from stok
            where menu_id = '$menu_id'";
		$result2 = $conn->query($sql);
		while($row2 = mysqli_fetch_assoc($result2))
		{
			$data[] = $row2;
		}

		if(count($data) > 0){
			for ($x = 0; $x < count($data); $x++) {
				$bahan_id = $data[$x]["bahan_id"];
				$jumlahawal = $data[$x]["jumlah"];
				$jumlahmin = $jumlahbefore - $jumlah;
				$jumlahakhir = $jumlahawal * $jumlahmin;

				$sql3 = "select stok from bahan
				where id = '$bahan_id'";
				$result3 = $conn->query($sql3);
				$row3 = mysqli_fetch_assoc($result3);

				$stokbahan = $row3["stok"];

				$stokupdate = $stokbahan + $jumlahakhir;
				$arrstok[] = $stokupdate;
				$arrbahan[] = $bahan_id;
			}
			for ($x = 0; $x < count($arrstok); $x++) {
				$sql = "UPDATE `bahan` 
				SET `stok` = '$arrstok[$x]', `updated_at` = '$updated_at' WHERE id = $arrbahan[$x]";
				mysqli_query($conn, $sql);

				$sql = "UPDATE `pesanan` 
				SET `menu_id` = '$menu_id', `user_id` = '$user_id', `jumlah` = '$jumlah', `tanggal` = '$tanggal', `updated_at` = '$updated_at', `created_at` = '$created_at' WHERE id = $id";
				mysqli_query($conn, $sql);
			}
			echo json_encode(array("statusCode"=>200));
		}else {
			echo json_encode(array("statusCode"=>201));
		}
	}
	mysqli_close($conn);
?>