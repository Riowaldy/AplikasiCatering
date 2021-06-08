<?php
    $conn = new mysqli("localhost","root","","catering");

    if ($conn -> connect_errno) {
        echo "Failed to connect to MySQL: " . $conn -> connect_error;
        exit();
    }
?>