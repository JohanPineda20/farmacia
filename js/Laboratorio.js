$(document).ready(function() {
    buscar_lab();
    var funcion;
    var edit = false;
    $('#form-crear-laboratorio').submit(e => {
        let nombre_laboratorio = $('#nombre-laboratorio').val();
        let id_editado = $('#id_editar_lab').val();
        if (edit == false) {
            funcion = 'crear';

        } else {
            funcion = 'editar';
        }


        $.post('../controller/LaboratorioController.php', { nombre_laboratorio, id_editado, funcion }, (response) => {
            console.log(response);
            if (response == 'add') {
                $('#add-laboratorio').hide('slow');
                $('#add-laboratorio').show(1000);
                $('#add-laboratorio').hide(2000);
                $('#form-crear-laboratorio').trigger('reset');
                buscar_lab();
            }
            if (response == 'noadd') {
                $('#noadd-laboratorio').hide('slow');
                $('#noadd-laboratorio').show(1000);
                $('#noadd-laboratorio').hide(2000);
                $('#form-crear-laboratorio').trigger('reset');

            }
            if (response == 'edit') {
                $('#edit-lab').hide('slow');
                $('#edit-lab').show(1000);
                $('#edit-lab').hide(2000);
                $('#form-crear-laboratorio').trigger('reset');
                buscar_lab();
            }

            edit = false;
        })
        e.preventDefault();
    });

    function buscar_lab(consulta) {
        funcion = 'buscar';
        $.post('../controller/LaboratorioController.php', { consulta, funcion }, (response) => {
            const laboratorios = JSON.parse(response); // recibir el jsonstring y convertirlo a json
            let template = ''; //html que será agregado a la tabla de laboratorios de la vista adm_atributo
            laboratorios.forEach(laboratorio => {
                //almacena en el atributo de tr labId el id de cada laboratorio ya que al dar clic al boton con clase avatar, editar o borrar va a ser pasado a un modal que tiene un formulario y al enviar el formulario va a ser pasado a controlador para hacer consulta en base de datos
                template += `
                  <tr labId="${laboratorio.id}" labNombre="${laboratorio.nombre}" labAvatar="${laboratorio.avatar}">
                  <td>
                        <button class="avatar btn btn-info" title="cambiar logo laboratorio" type="button" data-toggle="modal" data-target="#cambiologo">
                            <i class="far fa-image"></i>
                        </button>
                        <button class="editar btn btn-success" title="editar laboratorio" type="button" data-toggle="modal" data-target="#crearlaboratorio">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="borrar btn btn-danger" title="eliminar laboratorio">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                    <td>
                        <img src="${laboratorio.avatar}" class="img-fluid rounded" width="70" height="70">
                    </td>
                    <td>${laboratorio.nombre}</td>
                    
                    
                </tr>
                `; //itera y va almacenando todos los laboratorios en la variable template
            });
            $('#laboratorios').html(template); //agrega template al  cuerpo de la tabla con id laboratorios
        })
    }
    $(document).on('keyup', '#buscar-laboratorio', function() {
        let valor = $(this).val();
        if (valor != '') {
            buscar_lab(valor); //busca a los laboratorios que tengan ese valor en su nombre
        } else {
            buscar_lab(); //cuando el buscador está vacio me siga liste todos los laboratorios
        }
    })

    $(document).on('click', '.avatar', (e) => {
        funcion = "cambiar_logo";
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr('labId');
        const nombre = $(elemento).attr('labNombre');
        const avatar = $(elemento).attr('labAvatar');
        $('#logoactual').attr('src', avatar);
        $('#nombre_logo').html(nombre);
        $('#funcion').val(funcion)
        $('#id_logo_lab').val(id)

    })

    $('#form-logo').submit(e => {
        let formData = new FormData($('#form-logo')[0]);
        $.ajax({
            url: '../controller/LaboratorioController.php',
            type: 'POST',
            data: formData,
            cache: false,
            processData: false,
            contentType: false
        }).done(function(response) {
            const json = JSON.parse(response)
            if (json.alert == 'edit') {
                $('#logoactual').attr('src', json.ruta)
                $('#form-logo').trigger('reset');
                $('#edit').hide('slow');
                $('#edit').show(1000);
                $('#edit').hide(2000);

                buscar_lab();
            } else {
                $('#noedit').hide('slow');
                $('#noedit').show(1000);
                $('#noedit').hide(2000);
                $('#form-logo').trigger('reset');
            }

        });
        e.preventDefault();
    })

    $(document).on('click', '.borrar', (e) => {
        funcion = "borrar";
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr('labId');
        const nombre = $(elemento).attr('labNombre');
        const avatar = $(elemento).attr('labAvatar');
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
            imageUrl: '' + avatar + '',
            imageWidth: 100,
            imageHeight: 100,
            showCancelButton: true,
            confirmButtonText: 'Si,borra esto!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.post('../controller/LaboratorioController.php', { id, funcion }, (response) => {
                    edit = false;
                    if (response == 'borrado') {
                        swalWithBootstrapButtons.fire(
                            'Borrado!',
                            'El laboratorio ' + nombre + ' fue borrado.',
                            'success'
                        )
                        buscar_lab();

                    } else {

                        swalWithBootstrapButtons.fire(
                            'No se pudo Borrar!',
                            'El laboratorio ' + nombre + ' no gue borrado porque esta siendo usado por un producto',
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
                    'El laboratorio ' + nombre + ' no fue borrado.',
                    'error'
                )

            }
        })
    })

    $(document).on('click', '.editar', (e) => {
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr('labId');
        const nombre = $(elemento).attr('labNombre');
        $('#id_editar_lab').val(id);
        $('#nombre-laboratorio').val(nombre);
        edit = true;
    })

});