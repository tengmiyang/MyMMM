<?php 
    // $uname = $_GET['username'];
    // $pw = $_GET['password'];

    $uname = $_POST['username'];
    $pw = $_POST['password'];

    // echo $uname.'-----'.$pw;
    echo '{"username":"'.$uname.'","password":"'.$pw.'"}';
 ?>