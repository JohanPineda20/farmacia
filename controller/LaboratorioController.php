<?php
include '../model/Laboratorio.php';
$laboratorio = new Laboratorio();

if($_POST['funcion']=='crear'){
    $nombre= $_POST['nombre_laboratorio'];
    $avatar= 'lab_default.png';
    $laboratorio->crear($nombre, $avatar);
}
if($_POST['funcion']=='buscar'){
    $laboratorio->buscar();
    $json=array();

    foreach($laboratorio->objetos as $objeto){
        $json[]=array(
            'id'=>$objeto->id_laboratorio, //atributos de la base de datos
            'nombre'=>$objeto->nombre,
            'avatar'=>'../img/'.$objeto->avatar //el . es para concatenar
        );
    }
    $jsonstring=json_encode($json);
    echo $jsonstring; //retorna el jsonstring al response de laboratorio.js
}
?>