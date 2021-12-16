<?php
include 'Conexion.php';

class Tipo{
    var $objetos;
    public function __construct(){
        $db= new Conexion();
        $this->acceso=$db->pdo;
    }

    function crear($nombre){
        $sql = "SELECT id_tip_prod FROM tipo_producto where nombre=:nombre";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':nombre'=>$nombre));
        $this->objetos = $query->fetchall();
        if (!empty($this->objetos)) {
            echo 'noadd'; //devuelve un aviso en este caso "noadd" para saber que no se agregó porque ya existe un laboratorio con ese mismo nombre creado
        } 
        else {
            $sql = "INSERT into tipo_producto(nombre) values(:nombre);"; //no se coloca el id aca porque en la base de datos es auto incremental
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':nombre' => $nombre));

            echo 'add';//devuelve un aviso en este caso "add" para saber que se agregó
        }
    }

    function buscar(){

        if (!empty($_POST['consulta'])) {
            $consulta = $_POST['consulta'];
            $sql = "select * from tipo_producto where nombre like :consulta";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':consulta' => "%$consulta%"));
            $this->objetos = $query->fetchall();
            return $this->objetos;
        } else {
            $sql = "select * from tipo_producto where nombre NOT LIKE '' ORDER BY id_tip_prod LIMIT 25 ";//un limite de 25, no me muestre todos
            $query = $this->acceso->prepare($sql);
            $query->execute();
            $this->objetos = $query->fetchall();
            return $this->objetos;
        }
    }

   

    function borrar($id){
        $sql = "DELETE FROM tipo_producto where id_tip_prod =:id";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id' => $id));
        if(!empty($query->execute(array(':id' => $id)))){
            echo 'borrado';
        }else{
            echo 'No borrado';
        }
        
    }


    function editar($id_editado,$nombre){
        $sql = "UPDATE tipo_producto SET nombre=:nombre where id_tip_prod =:id";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id' => $id_editado,':nombre' => $nombre));
        echo 'edit';
       
    }


    function rellenar_tipos(){
        $sql = "SELECT * FROM tipo_producto order by nombre asc";
        $query = $this->acceso->prepare($sql);
        $query->execute();
        $this->objetos = $query->fetchall();
        return $this->objetos;
       
    }

}