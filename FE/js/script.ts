$(document).ready(function(){



});

function validarAltaCliente(){

    //Reglas de validacion
    let regNombreApellido = new RegExp("^[a-zA-ZÑñáéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ\s]{0,49}$");
    let regDocumento = new RegExp("^\d{1,9}$");
    let regTelefono = new RegExp("^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$");
    let regEmail = new RegExp("^[0-9a-z_\-\.]+@[0-9a-z\-\.]+\.[a-z]{2,4}$");

    //Valores del formulario
    let nombre:string = String($("#txtNombre").val());
    let apellido:string = String($("#txtApellido").val());
    let documento:string = String($("#txtDocumento").val());
    let telefono:string = String($("#txtTelefono").val());
    let direccion:string = String($("#txtDireccion").val());
    let email:string = String($("#txtEmail").val());
    
    
}