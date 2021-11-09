$(document).ready(function(){//jquery, una vez cargado el documento html, se va a ejecutar la funcion
    var funcion="";
    var id_usuario= $('#id_usuario').val();
    var edit=false;
    buscar_usuario(id_usuario);
    function buscar_usuario(dato) {
        funcion='buscar_usuario';
        $.post('../controlador/UsuarioController.php',{dato,funcion},(response)=>{ //ajax
            let nombre='';
            let apellidos='';
            let edad='';
            let dni='';
            let tipo='';
            let telefono='';
            let residencia='';
            let correo='';
            let sexo='';
            let adicional='';
            const usuario= JSON.parse(response);
            nombre+=`${usuario.nombre}`;
            apellidos+=`${usuario.apellidos}`;
            edad+=`${usuario.edad}`;
            dni+=`${usuario.dni}`;
            tipo+=`${usuario.tipo}`;
            telefono+=`${usuario.telefono}`;
            residencia+=`${usuario.residencia}`;
            correo+=`${usuario.correo}`;
            sexo+=`${usuario.sexo}`;
            adicional+=`${usuario.adicional}`;

           $('#nombre_us').html(nombre);
           $('#apellidos_us').html(apellidos);
           $('#edad').html(edad);
           $('#dni_us').html(dni);
           $('#us_tipo').html(tipo);
           $('#telefono_us').html(telefono);
           $('#residencia_us').html(residencia);
           $('#correo_us').html(correo);
           $('#sexo_us').html(sexo);
           $('#adicional_us').html(adicional);

        })
    }
    $(document).on('click','.edit',(e)=>{
        funcion='capturar_datos';
        edit=true;
        $.post('../controlador/UsuarioController.php',{funcion,id_usuario},(response)=>{
            const usuario= JSON.parse(response);
            $('#telefono').val(usuario.telefono);
            $('#residencia').val(usuario.residencia);
            $('#correo').val(usuario.correo);
            $('#sexo').val(usuario.sexo);
            $('#adicional').val(usuario.adicional);
        })
    });

    $('#form-usuario').submit(e=>{
        if(edit==true){
            let telefono=$('#telefono').val();
            let residencia=$('#residencia').val();
            let correo=$('#correo').val();
            let sexo=$('#sexo').val();
            let adicional=$('#adicional').val();
            funcion='editar_usuario';
            $.post('../controlador/UsuarioController.php',{id_usuario,funcion,telefono,residencia,correo,sexo,adicional},(response)=>{
                if(response=='editado'){
                   // $('#editado').hide('slow');
                    $('#editado').show(1000);
                    $('#editado').hide(2000);
                    $('#form-usuario').trigger('reset');
                }
            edit=false;
            buscar_usuario(id_usuario);
            })
        }
        else{
           // $('#noeditado').hide('slow');
            $('#noeditado').show(1000);
            $('#noeditado').hide(10000);
            $('#form-usuario').trigger('reset');
        }
        e.preventDefault(); //quitar que me refresque la pagina por el .submit
    });

    $('#form-pass').submit(e=>{
        let oldpass=$('#oldpass').val();
        let newpass=$('#newpass').val();
        funcion='cambiar_contra'
        $.post('../controlador/UsuarioController.php',{id_usuario,funcion,oldpass,newpass},(response)=>{
            if(response=='update'){
                $('#update').show(1000);
                $('#update').hide(2000);
                $('#form-pass').trigger('reset');
            }
            else{
                $('#noupdate').show(1000);
                $('#noupdate').hide(4000);
                $('#form-pass').trigger('reset');
            }
        })
        e.preventDefault();
    })
    $('#form-photo').submit(e=>{
        let formData= new FormData($('#form-photo')[0]);
        $.ajax({
            url:'../controlador/UsuarioController.php',
            type: 'POST',
            data:formData,
            cache:false,
            processData:false,
            contentType:false 
        }).done(function(reponse){
            console.log(reponse);
        });
    })
})