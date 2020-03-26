<?php
    include 'conmon.php';
    
    $dataId = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : '0';
    $maxNumber = isset($_REQUEST['changNum']) ? $_REQUEST['changNum'] : '0';
    
    $sql = "update shoppcar_list set maxNumber=$maxNumber where dataId=$dataId;";

    $res = $coon->query($sql);
      
    if($res){
        echo 'yes';
    }else{
        echo 'no';
    }

?>