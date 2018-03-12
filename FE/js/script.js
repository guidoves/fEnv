"use strict";
$(document).ready(function () {
    $("#eNombre").hide();
    $("#eApellido").hide();
    $("#eDocumento").hide();
    $("#eTelefono").hide();
    $("#eDireccion").hide();
    $("#eEmail").hide();
});
function validarAltaCliente() {
    restablecerAltaCliente();
    //Reglas de validacion
    var regNombreApellido = new RegExp("^[a-zA-ZÑñáéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ\s]{1,20}$");
    var regDocumento = new RegExp("^\\d{0,9}$");
    //let regTelefono = new RegExp("^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$");
    var regEmail = new RegExp("^[0-9a-z_\\-\\.]+@[0-9a-z\\-\\.]+\\.[a-z]{2,4}$");
    //Valores del formulario
    var nombre = String($("#txtNombre").val());
    var apellido = String($("#txtApellido").val());
    var documento = String($("#txtDocumento").val());
    var telefono = String($("#txtTelefono").val());
    var direccion = String($("#txtDireccion").val());
    var email = String($("#txtEmail").val());
    var validacion = true;
    //Validaciones
    if (nombre.match(regNombreApellido) != null) {
        $("#txtNombre").addClass("valido");
    }
    else {
        $("#txtNombre").addClass("invalido");
        $("#eNombre").show();
        validacion = false;
    }
    if (apellido.match(regNombreApellido) != null) {
        $("#txtApellido").addClass("valido");
    }
    else {
        $("#txtApellido").addClass("invalido");
        $("#eApellido").show();
        validacion = false;
    }
    if (documento.match(regDocumento) != null) {
        $("#txtDocumento").addClass("valido");
    }
    else {
        $("#txtDocumento").addClass("invalido");
        $("#eDocumento").show();
        validacion = false;
    }
    if (telefono.length > 0 && telefono.length < 25) {
        $("#txtTelefono").addClass("valido");
    }
    else {
        $("#txtTelefono").addClass("invalido");
        $("#eTelefono").show();
        validacion = false;
    }
    if (direccion.length > 0 && direccion.length < 50) {
        $("#txtDireccion").addClass("valido");
    }
    else {
        $("#txtDireccion").addClass("invalido");
        $("#eDireccion").show();
        validacion = false;
    }
    if (email.match(regEmail) != null || email.length == 0) {
        $("#txtEmail").addClass("valido");
    }
    else {
        $("#txtEmail").addClass("invalido");
        $("#eEmail").show();
        validacion = false;
    }
    if (validacion) {
        altaCliente();
    }
}
function altaCliente() {
    alert("Todo OK!");
    $("#btnCerrarAltaCliente").click();
    //cerrarAltaCliente();
}
function cerrarAltaCliente() {
    restablecerAltaCliente();
    $("#txtNombre").val("");
    $("#txtApellido").val("");
    $("#txtDocumento").val("");
    $("#txtTelefono").val("");
    $("#txtDireccion").val("");
    $("#txtEmail").val("");
}
function restablecerAltaCliente() {
    $("#txtNombre").removeClass();
    $("#txtNombre").addClass('form-control');
    $("#eNombre").hide();
    $("#txtApellido").removeClass();
    $("#txtApellido").addClass('form-control');
    $("#eApellido").hide();
    $("#txtDocumento").removeClass();
    $("#txtDocumento").addClass('form-control');
    $("#eDocumento").hide();
    $("#txtTelefono").removeClass();
    $("#txtTelefono").addClass('form-control');
    $("#eTelefono").hide();
    $("#txtDireccion").removeClass();
    $("#txtDireccion").addClass('form-control');
    $("#eDireccion").hide();
    $("#txtEmail").removeClass();
    $("#txtEmail").addClass('form-control');
    $("#eEmail").hide();
}
