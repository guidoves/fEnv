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
    var nombre = $('#txtNombre').val();
    var apellido = $('#txtApellido').val();
    var documento = $('#txtDocumento').val();
    var telefono = $('#txtTelefono').val();
    var direccion = $('#txtDireccion').val();
    var email = $('#txtEmail').val();
    var cliente = {
        "nombre": nombre,
        "apellido": apellido,
        "documento": documento,
        "telefono": telefono,
        "direccion": direccion,
        "email": email
    };
    $.ajax({
        data: cliente,
        type: "post",
        url: "http://localhost/workspace/fEnv/public/nuevocliente",
        success: function (response) {
            alert(response.ok);
            $("#btnCerrarAltaCliente").click();
        },
        error: function (response) {
            alert(response.statusText);
        }
    });
    //alert("Todo OK!");
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
function agendaTemplate() {
    $("#index").html("<strong style='color : red'>No hay datos de clientes.</strong>");
    var template = "<div class=\"agenda\">\n    <div class=\"card\">\n        <div class=\"card-title\">\n            <strong>AGENDA DE CLIENTES</strong>\n        </div>\n        <div class=\"card-body\">\n            <table class=\"table table-striped\">\n                <thead>\n                    <tr>\n                        <th scope=\"col\">Apellido</th>\n                        <th scope=\"col\">Nombre</th>\n                        <th scope=\"col\">Documento</th>\n                        <th scope=\"col\">Acci\u00F3n</th>\n                    </tr>\n                </thead>\n                <tbody id=\"bodyAgenda\">\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>";
    $.ajax({
        type: "get",
        url: "http://localhost/workspace/fEnv/public/operativas/clientesordenados",
        success: function (response) {
            $("#index").html(template);
            var body = "";
            for (var index = 0; index < response.length; index++) {
                body += "<tr><td>" + response[index].apellido + "</td><td>" + response[index].nombre + "</td><td>" + response[index].documento + "</td><td><button class='btn btn-link' data-controls-modal='vistaCliente' data-backdrop='static' data-keyboard='false' class='dropdown-item' data-toggle='modal' data-target='#vistaCliente' onclick='vistaCliente(" + response[index].id + ")'>Ver</button></td></tr>";
            }
            $("#bodyAgenda").html(body);
        },
        error: function (response) {
            alert(response.statusText);
        }
    });
}
function vistaCliente(id) {
    $.ajax({
        type: "get",
        url: "http://localhost/workspace/fEnv/public/operativas/clienteid?id=" + id,
        success: function (response) {
            var html = "<div><label for=\"\">Nombre:&nbsp</label>" + response[0].nombre + "</div><br>\n            <div><label for=\"\">Apellido:&nbsp</label>" + response[0].apellido + "</div><br>\n            <div><label for=\"\">Documento:&nbsp</label>" + response[0].documento + "</div><br>\n            <div><label for=\"\">Telefono:&nbsp</label>" + response[0].telefono + "</div><br>\n            <div><label for=\"\">Direccion:&nbsp</label>" + response[0].direccion + "</div><br>\n            <div><label for=\"\">Email:&nbsp</label>" + response[0].email + "</div><br>";
            $("#vistaClienteBody").html(html);
        },
        error: function (response) {
            alert(response.statusText);
        }
    });
}
function bajaCliente(id) {
}
