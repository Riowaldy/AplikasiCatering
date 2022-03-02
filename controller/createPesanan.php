<?php
    require 'koneksi.php';
    $sql = "select (case when (max(id)) is null then 1 else (max(id)+1) end) as id from pesanan";
    $result = $conn->query($sql);
    $row = mysqli_fetch_array($result);

    $id = $row['id'];
    $menu_id = $_POST['pesanan'];
    $user_id = $_POST['pelanggan'];
    $jumlah = $_POST['jumlah'];
    $tanggal = $_POST['tanggal'];
    date_default_timezone_set('Asia/Jakarta');
    $updated_at = date("Y-m-d h:i:s A");
    $created_at = date("Y-m-d h:i:s A");

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
            $jumlahakhir = $jumlahawal * $jumlah;

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

                $sql = "INSERT INTO pesanan (id, menu_id, user_id, jumlah, tanggal, updated_at, created_at)
                VALUES ($id, '$menu_id', '$user_id', '$jumlah', '$tanggal', '$updated_at', '$created_at')";
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
    
	mysqli_close($conn);
?>