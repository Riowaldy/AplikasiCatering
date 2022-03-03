<?php
	require 'koneksi.php';
	$id = $_POST['id'];
	$sql = "select created_pesanan from pesanan where id_pesanan = $id";
    $result = $conn->query($sql);
	$row = mysqli_fetch_array($result);
	
	$menu_id = $_POST['pesanan'];
    $user_id = $_POST['pelanggan'];
    $jumlah = $_POST['jumlah'];
    $tanggal = $_POST['tanggal'];
	date_default_timezone_set('Asia/Jakarta');
	$updated_at = date("Y-m-d h:i:s A");
	$created_at = $row['created_pesanan'];

	$sql = "select id_menu, jumlah_pesanan from pesanan
            where id_pesanan = '$id'";
	$result = $conn->query($sql);
	$row = mysqli_fetch_assoc($result);
	$jumlahbefore = $row["jumlah_pesanan"];
	$menu_id = $row["id_menu"];

	if($jumlahbefore == $jumlah){
		$sql = "UPDATE `pesanan` 
		SET `id_menu` = '$menu_id', `id_users` = '$user_id', `jumlah_pesanan` = '$jumlah', `tanggal_pesanan` = '$tanggal', `updated_pesanan` = '$updated_at', `created_pesanan` = '$created_at' WHERE id_pesanan = $id";
		if (mysqli_query($conn, $sql)) {
			echo json_encode(array("statusCode"=>200));
		} 
		else {
			echo json_encode(array("statusCode"=>201));
		}
	}else if ($jumlah > $jumlahbefore){
		$sql = "select id_menu, id_bahan, jumlah_stok from stok
            where id_menu = '$menu_id'";
		$result2 = $conn->query($sql);
		while($row2 = mysqli_fetch_assoc($result2))
		{
			$data[] = $row2;
		}
		$hitung = 0;
		if(count($data) > 0){
			for ($x = 0; $x < count($data); $x++) {
				$bahan_id = $data[$x]["id_bahan"];
				$jumlahawal = $data[$x]["jumlah_stok"];
				$jumlahmin = $jumlah - $jumlahbefore;
				$jumlahakhir = $jumlahawal * $jumlahmin;

				$sql3 = "select stok_bahan from bahan
				where id_bahan = '$bahan_id'";
				$result3 = $conn->query($sql3);
				$row3 = mysqli_fetch_assoc($result3);

				$stokbahan = $row3["stok_bahan"];

				$stokupdate = $stokbahan - $jumlahakhir;
				$hitung++;
				$arrstok[] = $stokupdate;
				$arrbahan[] = $bahan_id;
			}
			if($hitung == count($data)){
				for ($x = 0; $x < count($arrstok); $x++) {
					$sql = "UPDATE `bahan` 
					SET `stok_bahan` = '$arrstok[$x]', `updated_bahan` = '$updated_at' WHERE id_bahan = $arrbahan[$x]";
					mysqli_query($conn, $sql);

					$sql = "UPDATE `pesanan` 
					SET `id_menu` = '$menu_id', `id_users` = '$user_id', `jumlah_pesanan` = '$jumlah', `tanggal_pesanan` = '$tanggal', `updated_pesanan` = '$updated_at', `created_pesanan` = '$created_at' WHERE id_pesanan = $id";
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
		$sql = "select id_menu, id_bahan, jumlah_stok from stok
            where id_menu = '$menu_id'";
		$result2 = $conn->query($sql);
		while($row2 = mysqli_fetch_assoc($result2))
		{
			$data[] = $row2;
		}

		if(count($data) > 0){
			for ($x = 0; $x < count($data); $x++) {
				$bahan_id = $data[$x]["id_bahan"];
				$jumlahawal = $data[$x]["jumlah_stok"];
				$jumlahmin = $jumlahbefore - $jumlah;
				$jumlahakhir = $jumlahawal * $jumlahmin;

				$sql3 = "select stok_bahan from bahan
				where id_bahan = '$bahan_id'";
				$result3 = $conn->query($sql3);
				$row3 = mysqli_fetch_assoc($result3);

				$stokbahan = $row3["stok_bahan"];

				$stokupdate = $stokbahan + $jumlahakhir;
				$arrstok[] = $stokupdate;
				$arrbahan[] = $bahan_id;
			}
			for ($x = 0; $x < count($arrstok); $x++) {
				$sql = "UPDATE `bahan` 
				SET `stok_bahan` = '$arrstok[$x]', `updated_bahan` = '$updated_at' WHERE id_bahan = $arrbahan[$x]";
				mysqli_query($conn, $sql);

				$sql = "UPDATE `pesanan` 
				SET `id_menu` = '$menu_id', `id_users` = '$user_id', `jumlah_pesanan` = '$jumlah', `tanggal_pesanan` = '$tanggal', `updated_pesanan` = '$updated_at', `created_pesanan` = '$created_at' WHERE id_pesanan = $id";
				mysqli_query($conn, $sql);
			}
			echo json_encode(array("statusCode"=>200));
		}else {
			echo json_encode(array("statusCode"=>201));
		}
	}
	mysqli_close($conn);
?>