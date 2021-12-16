<?php
include '../model/Tipo.php';
$tipo = new Tipo();

if ($_POST['funcion'] == 'crear') {
    $nombre = $_POST['nombre_tipo'];
    $tipo->crear($nombre);
    
}

if ($_POST['funcion'] == 'editar') {
    $nombre = $_POST['nombre_Tipo'];
    $id_editado = $_POST['id_editado'];
    $tipo->editar($id_editado,$nombre);
}

if ($_POST['funcion'] == 'buscar') {
    $tipo->buscar();
    $json = array();

    foreach ($tipo->objetos as $objeto) {
        $json[] = array(
            'id' => $objeto->id_tip_prod, //atributos de la base de datos
            'nombre' => $objeto->nombre
          );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring; //retorna el jsonstring al response de tipo.js
}

if ($_POST['funcion'] == 'borrar') {
    $id = $_POST['id'];
    $tipo->borrar($id);
}

if ($_POST['funcion'] == 'rellenar_tipos') {
    $tipo->rellenar_tipos();
    $json = array();
    foreach ($tipo->objetos as $objeto) {
        $json[] = array(
            'id' => $objeto->id_tip_prod,
            'nombre'=>$objeto->nombre,
        );
    }

    $jsonstring=json_encode($json);
    echo $jsonstring;
}
