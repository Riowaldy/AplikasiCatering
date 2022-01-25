<?php
    $host = "localhost";
    $username = "root";
    $password = "";

    try{
        $pdo = new PDO("mysql:host=$host; dbname=catering", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    }catch (PDOException $e){
        echo "ERROR : " .$e->getMessage();
    }
?>