<?php
    include 'conmon.php';

    $username = isset($_REQUEST['username']) ? $_REQUEST['username'] : '.';
    $userpaw = isset($_REQUEST['userpaw']) ? $_REQUEST['userpaw'] : '.';

    //验证数据库数据是否和表单数据一样
    $sql = "SELECT * FROM zol_userreg WHERE username='$username' AND password= '$userpaw'";
   
    $res = $coon->query($sql); 

    //var_dump($res);
    if($res->num_rows){
        echo 'yes';
    }else{
        echo 'no';
    }
    
?>