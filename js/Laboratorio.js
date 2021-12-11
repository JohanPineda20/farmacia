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
            console.log(response);
        })     
    }
    $(document).on('keyup','#buscar-laboratorio',function(){
        let valor=$(this).val();
        if(valor!=''){
            buscar_lab(valor);
        }
        else{
            buscar_lab();
        }
    })
});