<?php
    require 'koneksi.php';
    $sql = "select (case when (max(id)) is null then 1 else (max(id)+1) end) as id from menu";
    $result = $conn->query($sql);
    $row = mysqli_fetch_array($result);

    $id = $row['id'];
    $nama = $_POST['nama'];
    $harga = $_POST['harga'];

    $valid_extensions = array('jpeg', 'jpg', 'png');
    define ('SITE_ROOT', dirname(__DIR__, 1));
    $path = SITE_ROOT.'/public/img/menu/'.$id.'/';
    $img = $_FILES["gambar"]["name"];
    $tmp = $_FILES["gambar"]["tmp_name"];
    $ext = strtolower(pathinfo($img, PATHINFO_EXTENSION));
    $final_image = rand(1000,1000000).$img;

    if (!file_exists($path)) {
        mkdir($path, 0777, true);
    }

    date_default_timezone_set('Asia/Jakarta');
    $updated_at = date("Y-m-d h:i:s A");
    $created_at = date("Y-m-d h:i:s A");

    $sql = "select nama from menu where nama = '$nama'";
    $result = $conn->query($sql);
    $row2 = mysqli_fetch_array($result);
    if($row2 == null){
        if(in_array($ext, $valid_extensions)) {
            $path = $path.strtolower($final_image);
            if(move_uploaded_file($tmp,$path)) {
                $sql = "INSERT INTO menu (id, nama, harga, gambar, updated_at, created_at)
                VALUES ($id, '$nama', '$harga', '$final_image', '$updated_at', '$created_at')";
                if (mysqli_query($conn, $sql)) {
                    echo json_encode(array("statusCode"=>200));
                } 
                else {
                    echo json_encode(array("statusCode"=>201));
                }
            }else{
                echo json_encode(array("statusCode"=>201));
            }
        }else{
            echo json_encode(array("statusCode"=>201));
        }
        
    }else{
        echo json_encode(array("statusCode"=>202));
    }
	mysqli_close($conn);
?>