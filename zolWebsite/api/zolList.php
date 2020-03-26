<?php

    include 'conmon.php';
    $coon->set_charset('utf8');  
    $num = isset($_REQUEST['num']) ? $_REQUEST['num'] : '0';    
    //语句查询
    switch ($num) {        
        case '0':       
            $sql = "SELECT * FROM zol_list";        
            break;        
        case '1':       
            $sql = "SELECT * FROM zol_userreg";        
            break;        
        case '2':        
            $sql = "SELECT * FROM zol_mainlist";        
            break;        
        case '3':        
            $sql = "SELECT * FROM shoppCar_list";        
            break;        
        // case '4':        
        //     $sql = "SELECT * FROM chufang";        
        //     break;    
         }
        $res1 = $coon->query($sql);
        //把数组转成字符串，echo给前端    
        $arr = $res1->fetch_all(MYSQLI_ASSOC);
        echo json_encode($arr);
        //关闭数据库    
        // $res1->close();   
        // $coon->close();


?>