<?php
include 'Conexion.php';

class Producto
{
    var $objetos;
    public function __construct()
    {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    function crear($nombre, $concentracion, $adicional, $precio, $laboratorio, $tipo, $presentacion, $avatar)
    {
        $sql = "SELECT id_producto FROM producto where nombre=:nombre and concentracion=:concentracion and adicional=:adicional and prod_lab=:laboratorio and prod_tip= :tipo and prod_pre=:presentacion";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':nombre' => $nombre, ':concentracion' => $concentracion, ':adicional' => $adicional, ':laboratorio' => $laboratorio, ':tipo' => $tipo, ':presentacion' => $presentacion));
        $this->objetos = $query->fetchall();
        if (!empty($this->objetos)) {
            echo 'noadd'; //devuelve un aviso en este caso "noadd" para saber que no se agregó porque ya existe un laboratorio con ese mismo nombre creado
        } else {
            $sql = "INSERT  INTO producto(nombre,concentracion, adicional, precio, avatar, prod_lab, prod_tip, prod_pre) values(:nombre,:concentracion,:adicional,:precio,:avatar,:laboratorio,:tipo,:presentacion);"; //no se coloca el id aca porque en la base de datos es auto incremental
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':nombre' => $nombre, ':concentracion' => $concentracion, ':adicional' => $adicional, ':precio' => $precio, ':laboratorio' => $laboratorio, ':tipo' => $tipo, ':presentacion' => $presentacion, ':avatar' => $avatar));
            echo 'add'; //devuelve un aviso en este caso "add" para saber que se agregó
        }
    }

    function buscar()
    {

        if (!empty($_POST['consulta'])) {
            $consulta = $_POST['consulta'];
            $sql = "SELECT id_producto,producto.nombre as nombre,concentracion,adicional,precio,laboratorio.nombre as laboratorio,tipo_producto.nombre as tipo, presentacion.nombre as presentacion, producto.avatar as avatar
            from producto
            join laboratorio on prod_lab=id_laboratorio
            join tipo_producto on prod_tip=id_tip_prod
            join presentacion on prod_pre=id_presentacion and producto.nombre LIKE :consulta LIMIT 25;";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':consulta' => "%$consulta%"));
            $this->objetos = $query->fetchall();
            return $this->objetos;
        } else {
            $sql = "SELECT id_producto,producto.nombre as nombre,concentracion,adicional,precio,laboratorio.nombre as laboratorio,tipo_producto.nombre as tipo, presentacion.nombre as presentacion, producto.avatar as avatar
            from producto
            join laboratorio on prod_lab=id_laboratorio
            join tipo_producto on prod_tip=id_tip_prod
            join presentacion on prod_pre=id_presentacion and producto.nombre not LIKE ''   ORDER BY producto.nombre  LIMIT 25;"; //un limite de 25, no me muestre todos
            $query = $this->acceso->prepare($sql);
            $query->execute();
            $this->objetos = $query->fetchall();
            return $this->objetos;
        }
    }
}
