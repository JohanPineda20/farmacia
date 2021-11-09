$(document).ready(function(){//jquery, una vez cargado el documento html, se va a ejecutar la funcion
    var funcion="";
    var id_usuario= $('#id_usuario').val();
    
    function buscar_usuario(dato) {
        funcion='buscar_usuario';
        $.post('../controlador/UsuarioController.php',{dato,funcion},(response)=>{

        })
    }
})