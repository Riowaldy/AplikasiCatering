<?php
    require 'koneksi.php';
    $id = $_POST['id'];
	date_default_timezone_set('Asia/Jakarta');
    $updated_at = date("Y-m-d h:i:s A");

	$sql = "select id_menu, jumlah_pesanan from pesanan
            where id_pesanan = '$id'";
    $result = $conn->query($sql);
	$row = mysqli_fetch_assoc($result);

	$menu_id = $row["menu_id"];
	$jumlah = $row["jumlah"];

	$sql = "select id_menu, id_bahan, jumlah_stok from stok
            where id_menu = '$menu_id'";
    $result2 = $conn->query($sql);
    while($row2 = mysqli_fetch_assoc($result2))
    {
        $data[] = $row2;
    }

	if(count($data) > 0){
		for ($x = 0; $x < count($data); $x++) {
            $bahan_id = $data[$x]["bahan_id"];
            $jumlahawal = $data[$x]["jumlah"];
            $jumlahakhir = $jumlahawal * $jumlah;

            $sql3 = "select stok_bahan from bahan
            where id_bahan = '$bahan_id'";
            $result3 = $conn->query($sql3);
            $row3 = mysqli_fetch_assoc($result3);

            $stokbahan = $row3["stok"];

            $stokupdate = $stokbahan + $jumlahakhir;
            $arrstok[] = $stokupdate;
            $arrbahan[] = $bahan_id;
        }
		for ($x = 0; $x < count($arrstok); $x++) {
			$sql = "UPDATE `bahan` 
			SET `stok_bahan` = '$arrstok[$x]', `updated_bahan` = '$updated_at' WHERE id_bahan = $arrbahan[$x]";
			mysqli_query($conn, $sql);

			$sql = "DELETE FROM pesanan WHERE id_pesanan = $id";
			mysqli_query($conn, $sql);
		}
		echo json_encode(array("statusCode"=>200));
	}else {
        echo json_encode(array("statusCode"=>201));
    }
	mysqli_close($conn);
?>