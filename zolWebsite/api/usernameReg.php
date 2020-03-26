<?php
    include 'conmon.php';
    //接收数据(插入数据库)
    $uname = isset($_REQUEST['uname']) ? $_REQUEST['uname'] : '';
    $paswd = isset($_REQUEST['paswd']) ? $_REQUEST['paswd'] : '';
    //SQL语句
    $sql ="insert into zol_userreg(username,password) values ('$uname','$paswd')";
    //执行语句
    $res = $coon->query($sql); 
    // var_dump($res);
    // $sumF = $res->num_rows;
    //传到前端
    if($res > 0){
        //注册成功
        echo 'yes';
    }else{
        //注册失败
        echo 'no';
    }
 
?>