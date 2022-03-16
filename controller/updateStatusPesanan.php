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

	$sql = "select id_menu, jumlah_pesanan from pesanan
	where id_pesanan = '$id'";
	$result2 = $conn->query($sql);
	$row2 = mysqli_fetch_assoc($result2);
	$id_menu = $row2["id_menu"];
	$jumlah = $row2["jumlah_pesanan"];

	$sql = "select id_menu, id_bahan, jumlah_stok from stok
            where id_menu = '$id_menu'";
    $result3 = $conn->query($sql);
    while($row3 = mysqli_fetch_assoc($result3))
    {
        $data[] = $row3;
    }

	$hitung = 0;
    if(count($data) > 0){
		for ($x = 0; $x < count($data); $x++) {
            $bahan_id = $data[$x]["id_bahan"];
            $jumlahawal = $data[$x]["jumlah_stok"];
            $jumlahakhir = $jumlahawal * $jumlah;

            $sql = "select stok_bahan from bahan
            where id_bahan = '$bahan_id'";
            $result4 = $conn->query($sql);
            $row4 = mysqli_fetch_assoc($result4);

            $stokbahan = $row4["stok_bahan"];

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
            }
			$sql = "UPDATE `pesanan` 
			SET `status_pesanan` = '$statusupd', `updated_pesanan` = '$updated_at', `created_pesanan` = '$created_at' WHERE id_pesanan = $id";
			if (mysqli_query($conn, $sql)) {
				echo json_encode(array("statusCode"=>200));
			} 
			else {
				echo json_encode(array("statusCode"=>201));
			}
        }
        else{
            echo json_encode(array("statusCode"=>202));
        }
	}
	else {
        echo json_encode(array("statusCode"=>201));
    }
	mysqli_close($conn);
?>