$(document).ready(function() {
    buscar_datos()
    var funcion;

    function buscar_datos(consulta) {
        funcion = 'buscar_usuarios_adm';
        $.post('../controller/UsuarioController.php', { consulta, funcion }, (response) => {
            const usuarios = JSON.parse(response);
            let template = '';
            usuarios.forEach(usuarios => {
                template += `
                <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
                <div class="card bg-light d-flex flex-fill">
                  <div class="card-header text-muted border-bottom-0">
                    ${usuarios.tipo}
                  </div>
                  <div class="card-body pt-0">
                    <div class="row">
                      <div class="col-7">
                        <h2 class="lead"><b>${usuarios.nombre} ${usuarios.apellido}</b></h2>
                        <p class="text-muted text-sm"><b>Sobre mi: </b> ${usuarios.adicional}</p>
                        <ul class="ml-4 mb-0 fa-ul text-muted">
                          <li class="small"><span class="fa-li"><i class="fas fa-lg fa-id-card"></i></span> DNI: ${usuarios.dni}</li>
                          <li class="small"><span class="fa-li"><i class="fas fa-lg fa-birthday-cake"></i></span>Edad : ${usuarios.edad}</li>
                          <li class="small"><span class="fa-li"><i class="fas fa-lg fa-building"></i></span> Residencia: ${usuarios.residencia}</li>
                          <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Phone : ${usuarios.telefono}</li>
                          <li class="small"><span class="fa-li"><i class="fas fa-lg fa-at"></i></span> Residencia: ${usuarios.correo}</li>
                          <li class="small"><span class="fa-li"><i class="fas fa-lg fa-smile-wink"></i></span> Phone : ${usuarios.sexo}</li>
                        </ul>
                      </div>
                      <div class="col-5 text-center">
                        <img src="${usuarios.avatar}" alt="user-avatar" class="img-circle img-fluid">
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div class="text-right">
                      <button class="btn btn-danger">
                      <i class="fas fa-window-close mr-1"></i>Eliminar
                      </button>
                    </div>
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
})