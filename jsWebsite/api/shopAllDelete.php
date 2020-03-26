<?php
    include 'conmon.php';
    
    $dataId = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : 0;
  
    if($dataId != 0){
        //echo $dataId;
        $sql = "DELETE FROM shoppcar_list";
    }
    $res = $coon->query($sql);
   
    // var_dump($res);
     //把数组转成字符串，echo给前端    
    if($res){
        echo 'yes';
    }else{
        echo 'no';
    }
?>