<?php
	require 'koneksi.php';
	$id = $_POST['id'];
	$sql = "select created_at from menu where id = $id";
    $result = $conn->query($sql);
	$row = mysqli_fetch_array($result);

    $cekgambar = $_POST["cekgambar"];
    date_default_timezone_set('Asia/Jakarta');
	$updated_at = date("Y-m-d h:i:s A");
	$created_at = $row['created_at'];

    if($cekgambar == 1){
        $valid_extensions = array('jpeg', 'jpg', 'png');
		define ('SITE_ROOT', dirname(__DIR__, 1));
		$path = SITE_ROOT.'/public/img/bukti/'.$id.'/';
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
			if(move_uploaded_file($tmp,$path)) {
				$sql = "UPDATE `pesanan` 
				SET `bukti` = '$final_image', `updated_at` = '$updated_at', `created_at` = '$created_at' WHERE id = $id";
				if (mysqli_query($conn, $sql)) {
					echo json_encode(array("statusCode"=>200));
				} 
				else {
					echo json_encode(array("statusCode"=>201));
				}
			}
			else {
				echo json_encode(array("statusCode"=>201));
			}
		}
		else {
			echo json_encode(array("statusCode"=>201));
		}
    }else{
        echo json_encode(array("statusCode"=>201));
    }
    mysqli_close($conn);
?>