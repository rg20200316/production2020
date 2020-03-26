<?php
    include 'conmon.php';

    $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : '2';
    $numYe = isset($_REQUEST['numYe']) ? $_REQUEST['numYe'] : '6';
  
    $index = ($page -1) * $numYe;
    
    $sql2 = "SELECT * FROM zol_list LIMIT $index,$numYe";//分页
    $res = $coon->query($sql2);//分页
    
    //把数组转成字符串，echo给前端    
    $arr = $res->fetch_all(MYSQLI_ASSOC);//分页
    //echo json_encode($arr);
    $sql ='SELECT * FROM zol_list';
    $res1 = $coon->query($sql);

    $data = array(
        'total' => $res1->num_rows,
        'page' => $page,
        'list' => $arr,
        'numYe' => $numYe
    );

    echo json_encode($data);
    
?>