$(document).ready(function(){
    buscar_lab();
    var funcion;
    $('#form-crear-laboratorio').submit(e=>{
        let nombre_laboratorio=$('#nombre-laboratorio').val();
        funcion='crear';
        $.post('../controller/LaboratorioController.php',{nombre_laboratorio, funcion},(response)=>{
            if(response=='add'){
                 $('#add-laboratorio').hide('slow');
                 $('#add-laboratorio').show(1000);
                 $('#add-laboratorio').hide(2000);
                 $('#form-crear-laboratorio').trigger('reset');
                 buscar_lab();
            }
            else{
                $('#noadd-laboratorio').hide('slow');
                 $('#noadd-laboratorio').show(1000);
                 $('#noadd-laboratorio').hide(2000);
                 $('#form-crear-laboratorio').trigger('reset');
            }
        })
        e.preventDefault();
    });

    function buscar_lab(consulta){
        funcion='buscar';
        $.post('../controller/LaboratorioController.php', {consulta,funcion}, (response)=>{
            const laboratorios= JSON.parse(response); // recibir el jsonstring y convertirlo a json
            let template=''; //html que será agregado a la tabla de laboratorios de la vista adm_atributo
            laboratorios.forEach(laboratorio => {
                //almacena en el atributo de tr labId el id de cada laboratorio ya que al dar clic al boton con clase avatar, editar o borrar va a ser pasado a un modal que tiene un formulario y al enviar el formulario va a ser pasado a controlador para hacer consulta en base de datos
                template+=`
                  <tr labId="${laboratorio.id}">
                    <td>${laboratorio.nombre}</td>
                    <td>
                        <img src="${laboratorio.avatar}" class="img-fluid rounded" width="70" height="70">
                    </td>
                    <td>
                        <button class="avatar btn btn-info" title="cambiar logo laboratorio">
                            <i class="far fa-image"></i>
                        </button>
                        <button class="editar btn btn-success" title="editar laboratorio">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="borrar btn btn-danger" title="eliminar laboratorio">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
                `; //itera y va almacenando todos los laboratorios en la variable template
            });
            $('#laboratorios').html(template);//agrega template al  cuerpo de la tabla con id laboratorios
        })     
    }
    $(document).on('keyup','#buscar-laboratorio',function(){
        let valor=$(this).val();
        if(valor!=''){
            buscar_lab(valor); //busca a los laboratorios que tengan ese valor en su nombre
        }
        else{
            buscar_lab(); //cuando el buscador está vacio me siga liste todos los laboratorios
        }
    })
});