<?php
	require 'koneksi.php';
	$id = $_POST['id'];
	$sql = "select id_users, DATE_FORMAT(tanggal_pesanan,'%Y-%m-%d') tanggal, created_pesanan from pesanan where id_pesanan = $id";
    $result = $conn->query($sql);
	$row = mysqli_fetch_array($result);

    $cekgambar = $_POST["cekgambar"];
    date_default_timezone_set('Asia/Jakarta');
	$updated_at = date("Y-m-d h:i:s A");
	$created_at = $row['created_pesanan'];
	$tanggal = $row['tanggal'];
	$user_id = $row['id_users'];
	define ('SITE_ROOT', dirname(__DIR__, 1));

    if($cekgambar == 1){
		$sql = "select id_pesanan from pesanan where DATE_FORMAT(tanggal_pesanan,'%Y-%m-%d') = '$tanggal' and id_users = '$user_id'";
		$result2 = $conn->query($sql);
		$uploaded = false;
		while($row2 = $result2 -> fetch_assoc()){
			$idloop = $row2['id_pesanan'];
			$valid_extensions = array('jpeg', 'jpg', 'png');
			$path = SITE_ROOT.'/public/img/bukti/'.$idloop.'/';
			$img = $_FILES["gambar"]["name"];
			$tmp = $_FILES["gambar"]["tmp_name"];
			$ext = strtolower(pathinfo($img, PATHINFO_EXTENSION));
			$final_image = rand(1000,1000000).$img;

			if (!file_exists($path)) {
				mkdir($path, 0777, true);
			}else{
				$files = glob($path.'*');
				foreach($files as $file){
					if(is_file($file)) {
						unlink($file);
					}
				}
			}

			if(in_array($ext, $valid_extensions)) {
				$path = $path.strtolower($final_image);
				if ($uploaded)
				{
					copy($uploaded, $path);
					$sql = "UPDATE `pesanan` 
					SET `bukti` = '$final_image', `updated_pesanan` = '$updated_at', `created_pesanan` = '$created_at' WHERE `id_pesanan` = '$idloop'";
					if (mysqli_query($conn, $sql)) {
						
					} 
					else {
						
					}
				}
				else
				{
					if (move_uploaded_file($tmp,$path))
					{
						$sql = "UPDATE `pesanan` 
						SET `bukti` = '$final_image', `updated_pesanan` = '$updated_at', `created_pesanan` = '$created_at' WHERE `id_pesanan` = '$idloop'";
						if (mysqli_query($conn, $sql)) {
							
						} 
						else {
							
						}
						$uploaded = $path;
					}
				}
			}
			else {
				
			}
		}
        echo json_encode(array("statusCode"=>200));
    }else{
        echo json_encode(array("statusCode"=>201));
    }
    mysqli_close($conn);
?>