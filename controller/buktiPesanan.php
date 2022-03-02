<?php
	require 'koneksi.php';
	$id = $_POST['id'];
	$sql = "select user_id, DATE_FORMAT(tanggal,'%Y-%m-%d') tanggal, created_at from pesanan where id = $id";
    $result = $conn->query($sql);
	$row = mysqli_fetch_array($result);

    $cekgambar = $_POST["cekgambar"];
    date_default_timezone_set('Asia/Jakarta');
	$updated_at = date("Y-m-d h:i:s A");
	$created_at = $row['created_at'];
	$tanggal = $row['tanggal'];
	$user_id = $row['user_id'];
	define ('SITE_ROOT', dirname(__DIR__, 1));

    if($cekgambar == 1){
		$sql = "select id from pesanan where DATE_FORMAT(tanggal,'%Y-%m-%d') = '$tanggal' and user_id = '$user_id'";
		$result2 = $conn->query($sql);
		$uploaded = false;
		while($row2 = $result2 -> fetch_assoc()){
			$idloop = $row2['id'];
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
					SET `bukti` = '$final_image', `updated_at` = '$updated_at', `created_at` = '$created_at' WHERE `id` = '$idloop'";
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
						SET `bukti` = '$final_image', `updated_at` = '$updated_at', `created_at` = '$created_at' WHERE `id` = '$idloop'";
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