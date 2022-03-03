<?php
    require 'koneksi.php';
    $sql = "select (case when (max(id_stok)) is null then 1 else (max(id_stok)+1) end) as id from stok";
    $result = $conn->query($sql);
    $row = mysqli_fetch_array($result);

    $id = $row['id'];
    $menu_id = $_POST['menu'];
    $bahan_id = $_POST['bahan'];
    $jumlah = $_POST['jumlah'];
    date_default_timezone_set('Asia/Jakarta');
    $updated_at = date("Y-m-d h:i:s A");
    $created_at = date("Y-m-d h:i:s A");

    $sql = "INSERT INTO stok (id_stok, id_menu, id_bahan, jumlah_stok, updated_stok, created_stok)
    VALUES ($id, '$menu_id', '$bahan_id', '$jumlah', '$updated_at', '$created_at')";
    if (mysqli_query($conn, $sql)) {
        echo json_encode(array("statusCode"=>200));
	} 
	else {
		echo json_encode(array("statusCode"=>201));
	}
	mysqli_close($conn);
?>