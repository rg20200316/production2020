<?php
    include 'conmon.php';
    //接收数据(查询验证)
    $username = isset($_REQUEST['name']) ? $_REQUEST['name'] : ' ';
    //ehco $username;
    //SQL语句
    $sql = "SELECT * FROM zol_userreg WHERE username='$username'";
   
    //执行语句
    $res = $coon->query($sql);
    $sum = $res->num_rows;
     //var_dump($sum);
     //判断  是否存在用户名 
    if($sum){
        //存在，不可以注册，可以登陆
        echo 'no';
    }else{
        //不存在，可以注册，不可以登陆
        echo 'yes';
    }
  
?>