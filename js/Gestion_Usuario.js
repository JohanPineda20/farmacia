$(document).ready(function() {
    var tipo_usuario = $('#tipo_usuario').val();

    if (tipo_usuario == 2) {
      $('#button-crear').hide();

  }
    
    buscar_datos()
    var funcion;

    function buscar_datos(consulta) {
        funcion = 'buscar_usuarios_adm';
        $.post('../controller/UsuarioController.php', { consulta, funcion }, (response) => {
            const usuarios = JSON.parse(response);
            let template = '';
            usuarios.forEach(usuarios => {
                template += `
                <div usuarioId="${usuarios.id}" class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
                <div class="card bg-light d-flex flex-fill">
                  <div class="card-header text-muted border-bottom-0">
                    ${usuarios.tipo}
                  </div>
                  <div class="card-body pt-0">
                    <div class="row">
                      <div class="col-7">
                        <h2 class="lead"><b>${usuarios.nombre} ${usuarios.apellidos}</b></h2>
                        <p class="text-muted text-sm"><b>Sobre mi: </b> ${usuarios.adicional}</p>
                        <ul class="ml-4 mb-0 fa-ul text-muted">
                          <li class="small"><span class="fa-li"><i class="fas fa-lg fa-id-card"></i></span> DNI: ${usuarios.dni}</li>
                          <li class="small"><span class="fa-li"><i class="fas fa-lg fa-birthday-cake"></i></span>Edad : ${usuarios.edad}</li>
                          <li class="small"><span class="fa-li"><i class="fas fa-lg fa-building"></i></span> Residencia: ${usuarios.residencia}</li>
                          <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Telefono : ${usuarios.telefono}</li>
                          <li class="small"><span class="fa-li"><i class="fas fa-lg fa-at"></i></span> Correo: ${usuarios.correo}</li>
                          <li class="small"><span class="fa-li"><i class="fas fa-lg fa-smile-wink"></i></span> Sexo : ${usuarios.sexo}</li>
                        </ul>
                      </div>
                      <div class="col-5 text-center">
                        <img src="${usuarios.avatar}" alt="user-avatar" class="img-circle img-fluid">
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div class="text-right">`;
                if (tipo_usuario==3) {
                    if (usuarios.tipo_usuario!=3) {
                        template += `
                        <button class = "btn btn-danger mr-1">
                          <i class = "fas fa-window-close mr-1" ></i>Eliminar 
                        </button>`;
                    }
                    if (usuarios.tipo_usuario==2) {
                        template += `
                      <button class = "ascender btn btn-primary ml-1" type="button" data-toggle="modal" data-target="#confirmar">
                        <i class = "fas fa-sort-amount-up mr-1" ></i>Ascender 
                      </button>`;
                    }
                    if(usuarios.tipo_usuario==1){
                      template += `
                      <button class="descender btn btn-secondary ml-1" type="button" data-toggle="modal" data-target="#confirmar">
                        <i class="fas fa-sort-amount-down mr-1" ></i>Descender
                      </button>`;
                    }

                } else {
                    if (tipo_usuario == 1 && usuarios.tipo_usuario != 1 && usuarios.tipo_usuario != 3) {
                        template += `<button class = "btn btn-danger mr-1">
                      <i class = "fas fa-window-close mr-1" > </i> Eliminar 
                      </button>`;
                    }
                }
                template +=
                    `</div>
                    </div>
                  </div>
                </div>
                     `;
            })
            $('#usuarios').html(template);
        });
    }
    $(document).on('keyup', '#buscar', function() {

        let valor = $(this).val();
        if (valor != "") {
            buscar_datos(valor);
        } else {
            buscar_datos();
        }
    });
    $('#form-crear').submit(e => {
        let nombre = $('#nombre').val();
        let apellidos = $('#apellido').val();
        let edad = $('#edad').val();
        let dni = $('#dni').val();
        let pass = $('#pass').val();
        funcion = 'crear_usuario';
        $.post('../controller/UsuarioController.php',{nombre, apellidos, edad, dni, pass, funcion},(response)=>{
          if (response == 'add') {
            $('#add').hide('slow');
            $('#add').show(1000);
            $('#add').hide(2000);
            $('#form-crear').trigger('reset');
            buscar_datos();
        } else {
            $('#noadd').hide('slow');
            $('#noadd').show(1000);
            $('#noadd').hide(2000);
            $('#form-crear').trigger('reset');
        }
        });
        e.preventDefault();
    });
    $(document).on('click','.ascender',(e)=>{
      const elemento=$(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
      const id=$(elemento).attr('usuarioId');
      funcion='ascender';
      $('#id_user').val(id);
      $('#funcion').val(funcion);
    });
    $(document).on('click','.descender',(e)=>{
      const elemento=$(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
      const id=$(elemento).attr('usuarioId');
      funcion='descender';
      $('#id_user').val(id);
      $('#funcion').val(funcion);
    });
    $('#form-confirmar').submit(e=>{
      let pass=$('#oldpass').val();
      let id_usuario=$('#id_user').val();
      funcion=$('#funcion').val();
      $.post('../controller/UsuarioController.php',{pass,id_usuario,funcion},(response)=>{
        if(response=='ascendido' || response=='descendido'){
          $('#confirmado').hide('slow');
          $('#confirmado').show(1000);
          $('#confirmado').hide(2000);
          $('#form-confirmado').trigger('reset');
        }
        else{
          $('#rechazado').hide('slow');
          $('#rechazado').show(1000);
          $('#rechazado').hide(2000);
          $('#form-confirmar').trigger('reset');
        }
        buscar_datos();
      });
      e.preventDefault();
    });

    
})