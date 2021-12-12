$(document).ready(function() {
    buscar_pre();
    var funcion;
    var edit = false;
    $('#form-crear-presentacion').submit(e => {
        let nombre_presentacion = $('#nombre-presentacion').val();
        let id_editado = $('#id_editar_pre').val();
        if (edit == false) {
            funcion = 'crear';

        } else {
            funcion = 'editar';
        }


        $.post('../controller/PresentacionController.php', { nombre_presentacion, id_editado, funcion }, (response) => {
            console.log(response);
            if (response == 'add') {
                $('#add-pre').hide('slow');
                $('#add-pre').show(1000);
                $('#add-pre').hide(2000);
                $('#form-crear-presentacion').trigger('reset');
                buscar_pre();
            }
            if (response == 'noadd') {
                $('#noadd-pre').hide('slow');
                $('#noadd-pre').show(1000);
                $('#noadd-pre').hide(2000);
                $('#form-crear-presentacion').trigger('reset');

            }
            if (response == 'edit') {
                $('#edit-pre').hide('slow');
                $('#edit-pre').show(1000);
                $('#edit-pre').hide(2000);
                $('#form-crear-presentacion').trigger('reset');
                buscar_pre();
            }

            edit = false;
        })
        e.preventDefault();
    });

    function buscar_pre(consulta) {
        funcion = 'buscar';
        $.post('../controller/PresentacionController.php', { consulta, funcion }, (response) => {
            const presentaciones = JSON.parse(response); // recibir el jsonstring y convertirlo a json
            let template = ''; //html que será agregado a la tabla de presentaciones de la vista adm_atributo
            presentaciones.forEach(presentacion => {
                //almacena en el atributo de tr labId el id de cada presentacion ya que al dar clic al boton con clase avatar, editar o borrar va a ser pasado a un modal que tiene un formulario y al enviar el formulario va a ser pasado a controlador para hacer consulta en base de datos
                template += `
                  <tr preId="${presentacion.id}" preNombre="${presentacion.nombre}" >
                  <td>
                        <button class="editar-pre btn btn-success" title="editar presentacion" type="button" data-toggle="modal" data-target="#crearpresentacion">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="borrar-pre btn btn-danger" title="eliminar presentacion">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                   
                    <td>${presentacion.nombre}</td>
                    
                </tr>
                `; //itera y va almacenando todos los presentaciones en la variable template
            });
            $('#presentaciones').html(template); //agrega template al  cuerpo de la tabla con id presentaciones
        })
    }
    $(document).on('keyup', '#buscar-presentacion', function() {
        let valor = $(this).val();
        if (valor != '') {
            buscar_pre(valor); //busca a los presentaciones que tengan ese valor en su nombre
        } else {
            buscar_pre(); //cuando el buscador está vacio me siga liste todos los presentaciones
        }
    })

    $(document).on('click', '.borrar-pre', (e) => {
        funcion = "borrar";
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr('preId');
        const nombre = $(elemento).attr('preNombre');
        // console.log(id + nombre + avatar);

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger mr-1'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Decea Eliminar ' + nombre + '?',
            text: "No podras revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si,borra esto!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.post('../controller/PresentacionController.php', { id, funcion }, (response) => {
                    edit = false;
                    if (response == 'borrado') {
                        swalWithBootstrapButtons.fire(
                            'Borrado!',
                            'la presentacion ' + nombre + ' fue borrado.',
                            'success'
                        )
                        buscar_pre();

                    } else {

                        swalWithBootstrapButtons.fire(
                            'No se pudo Borrar!',
                            'la presentacion ' + nombre + ' no fue borrado porque esta siendo usado por un producto',
                            'error'
                        )

                    }

                })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'la presentacion ' + nombre + ' no fue borrado.',
                    'error'
                )

            }
        })
    })

    $(document).on('click', '.editar-pre', (e) => {
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr('preId');
        const nombre = $(elemento).attr('preNombre');
        $('#id_editar_pre').val(id);
        $('#nombre-presentacion').val(nombre);
        edit = true;
    })

});