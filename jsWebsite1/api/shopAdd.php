<?php
    include 'conmon.php';
    //接收数据(插入数据库)
    $dataId = isset($_REQUEST['dataId']) ? $_REQUEST['dataId'] : '';
    $picHref = isset($_REQUEST['picHref']) ? $_REQUEST['picHref'] : '';
    $picSrc = isset($_REQUEST['picSrc']) ? $_REQUEST['picSrc'] : '';
    $picAlt = isset($_REQUEST['picAlt']) ? $_REQUEST['picAlt'] : '';
    $securityHerf = isset($_REQUEST['securityHerf']) ? $_REQUEST['securityHerf'] : '';
    $pTxt = isset($_REQUEST['pTxt']) ? $_REQUEST['pTxt'] : '';
    $Sprice = isset($_REQUEST['Sprice']) ? $_REQUEST['Sprice'] : '';
    $maxNumber = isset($_REQUEST['maxNumber']) ? $_REQUEST['maxNumber'] : '';
    $Stotal = isset($_REQUEST['Stotal']) ? $_REQUEST['Stotal'] : '';
    //SQL语句
    // $sql ="insert into zol_userreg(username,password) values ('$uname','$paswd')";
    $sql ="INSERT into shoppcar_list(dataId,picHref,picSrc,picAlt,securityHerf,pTxt,Sprice,maxNumber,Stotal)
     VALUES ($dataId,'$picHref','$picSrc','$picAlt','$securityHerf','$pTxt', $Sprice,$maxNumber, $Stotal)";
    //执行语句
    $res = $coon->query($sql); 
     var_dump($res);
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