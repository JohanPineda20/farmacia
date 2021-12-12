$(document).ready(function() {
    buscar_tip();
    var funcion;
    var edit = false;
    $('#form-crear-tipo').submit(e => {
        let nombre_tipo = $('#nombre-tipo').val();
        let id_editado = $('#id_editar_tip').val();
        if (edit == false) {
            funcion = 'crear';

        } else {
            funcion = 'editar';
        }


        $.post('../controller/TipoController.php', { nombre_tipo, id_editado, funcion }, (response) => {
            console.log(response);
            if (response == 'add') {
                $('#add-tipo').hide('slow');
                $('#add-tipo').show(1000);
                $('#add-tipo').hide(2000);
                $('#form-crear-tipo').trigger('reset');
                buscar_tip();
            }
            if (response == 'noadd') {
                $('#noadd-tipo').hide('slow');
                $('#noadd-tipo').show(1000);
                $('#noadd-tipo').hide(2000);
                $('#form-crear-tipo').trigger('reset');

            }
            if (response == 'edit') {
                $('#edit-tip').hide('slow');
                $('#edit-tip').show(1000);
                $('#edit-tip').hide(2000);
                $('#form-crear-tipo').trigger('reset');
                buscar_tip();
            }

            edit = false;
        })
        e.preventDefault();
    });

    function buscar_tip(consulta) {
        funcion = 'buscar';
        $.post('../controller/TipoController.php', { consulta, funcion }, (response) => {
            const tipos = JSON.parse(response); // recibir el jsonstring y convertirlo a json
            let template = ''; //html que será agregado a la tabla de tipos de la vista adm_atributo
            tipos.forEach(tipo => {
                //almacena en el atributo de tr labId el id de cada tipo ya que al dar clic al boton con clase avatar, editar o borrar va a ser pasado a un modal que tiene un formulario y al enviar el formulario va a ser pasado a controlador para hacer consulta en base de datos
                template += `
                  <tr tipId="${tipo.id}" tipNombre="${tipo.nombre}" >
                  <td>
                        <button class="editar-tip btn btn-success" title="editar tipo" type="button" data-toggle="modal" data-target="#creartipo">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="borrar-tip btn btn-danger" title="eliminar tipo">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                   
                    <td>${tipo.nombre}</td>
                    
                </tr>
                `; //itera y va almacenando todos los tipos en la variable template
            });
            $('#tipos').html(template); //agrega template al  cuerpo de la tabla con id tipos
        })
    }
    $(document).on('keyup', '#buscar-tipo', function() {
        let valor = $(this).val();
        if (valor != '') {
            buscar_tip(valor); //busca a los tipos que tengan ese valor en su nombre
        } else {
            buscar_tip(); //cuando el buscador está vacio me siga liste todos los tipos
        }
    })

    $(document).on('click', '.borrar-tip', (e) => {
        funcion = "borrar";
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr('tipId');
        const nombre = $(elemento).attr('tipNombre');
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
                $.post('../controller/TipoController.php', { id, funcion }, (response) => {
                    edit = false;
                    if (response == 'borrado') {
                        swalWithBootstrapButtons.fire(
                            'Borrado!',
                            'El tipo ' + nombre + ' fue borrado.',
                            'success'
                        )
                        buscar_tip();

                    } else {

                        swalWithBootstrapButtons.fire(
                            'No se pudo Borrar!',
                            'El tipo ' + nombre + ' no gue borrado porque esta siendo usado por un producto',
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
                    'El tipo ' + nombre + ' no fue borrado.',
                    'error'
                )

            }
        })
    })

    $(document).on('click', '.editar-tip', (e) => {
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr('tipId');
        const nombre = $(elemento).attr('tipNombre');
        $('#id_editar_tip').val(id);
        $('#nombre-tipo').val(nombre);
        edit = true;
    })

});