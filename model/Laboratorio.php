<?php
include 'Conexion.php';

class Laboratorio{
    var $objetos;
    public function __construct(){
        $db= new Conexion();
        $this->acceso=$db->pdo;
    }

    function crear($nombre, $avatar){
        $sql = "SELECT id_laboratorio FROM laboratorio where nombre=:nombre";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':nombre'=>$nombre));
        $this->objetos = $query->fetchall();
        if (!empty($this->objetos)) {
            echo 'noadd'; //devuelve un aviso en este caso "noadd" para saber que no se agregó porque ya existe un laboratorio con ese mismo nombre creado
        } 
        else {
            $sql = "INSERT into laboratorio(nombre,avatar) values(:nombre,:avatar);"; //no se coloca el id aca porque en la base de datos es auto incremental
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':nombre' => $nombre,':avatar'=>$avatar));

            echo 'add';//devuelve un aviso en este caso "add" para saber que se agregó
        }
    }

    function buscar(){

        if (!empty($_POST['consulta'])) {
            $consulta = $_POST['consulta'];
            $sql = "select * from laboratorio where nombre like :consulta";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':consulta' => "%$consulta%"));
            $this->objetos = $query->fetchall();
            return $this->objetos;
        } else {
            $sql = "select * from laboratorio where nombre NOT LIKE '' ORDER BY id_laboratorio LIMIT 25 ";//un limite de 25, no me muestre todos
            $query = $this->acceso->prepare($sql);
            $query->execute();
            $this->objetos = $query->fetchall();
            return $this->objetos;
        }
    }
}

?>