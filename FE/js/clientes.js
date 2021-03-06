"use strict";
var urlServer = "http://localhost/workspace/fEnv/public";
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
    //Valores del formulario
    var nombre = String($("#txtNombre").val());
    var apellido = String($("#txtApellido").val());
    var documento = String($("#txtDocumento").val());
    var telefono = String($("#txtTelefono").val());
    var direccion = String($("#txtDireccion").val());
    var email = String($("#txtEmail").val());
    var cliente = {
        nombre: nombre,
        apellido: apellido,
        documento: documento,
        telefono: telefono,
        direccion: direccion,
        email: email
    };
    var validaciones = validacion(cliente);
    //Validaciones
    if (validaciones.nombre) {
        $("#txtNombre").addClass("valido");
    }
    else {
        $("#txtNombre").addClass("invalido");
        $("#eNombre").show();
    }
    if (validaciones.apellido) {
        $("#txtApellido").addClass("valido");
    }
    else {
        $("#txtApellido").addClass("invalido");
        $("#eApellido").show();
    }
    if (validaciones.documento) {
        $("#txtDocumento").addClass("valido");
    }
    else {
        $("#txtDocumento").addClass("invalido");
        $("#eDocumento").show();
    }
    if (validaciones.telefono) {
        $("#txtTelefono").addClass("valido");
    }
    else {
        $("#txtTelefono").addClass("invalido");
        $("#eTelefono").show();
    }
    if (validaciones.direccion) {
        $("#txtDireccion").addClass("valido");
    }
    else {
        $("#txtDireccion").addClass("invalido");
        $("#eDireccion").show();
    }
    if (validaciones.email) {
        $("#txtEmail").addClass("valido");
    }
    else {
        $("#txtEmail").addClass("invalido");
        $("#eEmail").show();
    }
    if (validaciones.nombre == true && validaciones.apellido == true && validaciones.documento == true && validaciones.email == true && validaciones.telefono == true && validaciones.direccion == true) {
        altaCliente();
    }
}
function validacion(cliente) {
    var validacion = {
        nombre: true,
        apellido: true,
        documento: true,
        telefono: true,
        direccion: true,
        email: true
    };
    //Reglas de validacion
    var regNombreApellido = new RegExp("^[a-zA-ZÑñáéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ \s]{1,20}$");
    var regDocumento = new RegExp("^\\d{0,9}$");
    //let regTelefono = new RegExp("^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$");
    var regEmail = new RegExp("^[0-9a-z_\\-\\.]+@[0-9a-z\\-\\.]+\\.[a-z]{2,4}$");
    //Validaciones
    if (cliente.nombre.match(regNombreApellido) == null) {
        validacion.nombre = false;
    }
    if (cliente.apellido.match(regNombreApellido) == null) {
        validacion.apellido = false;
    }
    if (cliente.documento.match(regDocumento) == null) {
        validacion.documento = false;
    }
    if (cliente.telefono.length == 0 || cliente.telefono.length > 25) {
        validacion.telefono = false;
    }
    if (cliente.direccion.length == 0 || cliente.direccion.length > 50) {
        validacion.direccion = false;
    }
    if (cliente.email.match(regEmail) == null && cliente.email.length > 0) {
        validacion.email = false;
    }
    return validacion;
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
        url: urlServer + "/nuevocliente",
        success: function (response, status, xhr) {
            if (xhr.status == 200) {
                console.log(response);
                $("#btnCerrarAltaCliente").click();
                agendaTemplate();
            }
            else if (xhr.status == 202) {
                var mensaje = "";
                if (response.email != null)
                    mensaje += response.email + ". ";
                if (response.documento != null)
                    mensaje += response.documento;
                alert(mensaje);
            }
        },
        error: function (response) {
            alert(response.statusText);
        },
    });
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
    var template = "<div class=\"agenda\">\n    <div class=\"card\">\n        <div class=\"card-header\">\n            <div class=\"card-title\">\n                <div class=\"contenedor\">\n                    <div class=\"elementoAgenda\">\n                        <strong>AGENDA DE CLIENTES</strong>\n                    </div>\n                    <div class=\"elementoAgenda\">\n                        <form class=\"form-inline my-2 my-lg-0\">\n                            <input id=\"txtBuscarCliente\" class=\"form-control mr-sm-2\" type=\"search\" placeholder=\"Ingrese datos...\">\n                            <button id=\"btnBuscarCliente\" class=\"btn btn-outline-success my-2 my-sm-2\" type=\"submit\">Buscar Cliente</button>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        \n        </div>\n        <div class=\"card-body\">\n            <table class=\"table table-striped\">\n                <thead>\n                    <tr>\n                        <th scope=\"col\">Apellido</th>\n                        <th scope=\"col\">Nombre</th>\n                        <th scope=\"col\">Tel\u00E9fono</th>\n                        <th scope=\"col\">Acci\u00F3n</th>\n                    </tr>\n                </thead>\n                <tbody id=\"bodyAgenda\">\n                </tbody>\n            </table>\n        </div>\n        <div class=\"card-footer\">\n            <div id=footerAgenda></div>\n        </div>\n    </div>\n</div>";
    $.ajax({
        type: "get",
        url: urlServer + "/operativas/clientesordenados",
        success: function (response) {
            $("#index").html(template);
            var body = "";
            for (var index = 0; index < response.length; index++) {
                body += "<tr><td>" + response[index].apellido + "</td><td>" + response[index].nombre + "</td><td>" + response[index].telefono + "</td><td><button class='btn btn-info' data-controls-modal='vistaCliente' data-backdrop='static' data-keyboard='false' class='dropdown-item' data-toggle='modal' data-target='#vistaCliente' onclick='vistaCliente(" + response[index].id + ")'>Detalle</button></td></tr>";
            }
            $("#bodyAgenda").html(body);
            $("#btnBuscarCliente").on("click", function () {
                buscarAgenda(response);
            });
        },
        error: function (response) {
            alert(response.statusText);
        }
    });
}
function buscarCliente(cliente, datos) {
    var resultado = null;
    if (cliente != null && cliente != "") {
        var valor_1 = ucwords(cliente.toLowerCase());
        resultado = datos.filter(function (cliente) {
            return cliente.nombre == valor_1 || cliente.apellido == valor_1 || cliente.documento == valor_1 || cliente.telefono == valor_1 || cliente.email == valor_1;
        });
    }
    return resultado;
}
function buscarAgenda(datos) {
    var valor = String($("#txtBuscarCliente").val());
    var resultado = buscarCliente(valor, datos);
    var html = "";
    var html_dos = "<button class=\"btn btn-primary\" onclick=\"agendaTemplate()\">Vista todos</button>";
    if (resultado != null) {
        if (resultado.length != 0) {
            for (var index = 0; index < resultado.length; index++) {
                html += "<tr><td>" + resultado[index].apellido + "</td><td>" + resultado[index].nombre + "</td><td>" + resultado[index].documento + "</td><td><button class='btn btn-info' data-controls-modal='vistaCliente' data-backdrop='static' data-keyboard='false' class='dropdown-item' data-toggle='modal' data-target='#vistaCliente' onclick='vistaCliente(" + resultado[index].id + ")'>Detalle</button></td></tr>";
            }
            $("#bodyAgenda").html(html);
            $("#footerAgenda").html(html_dos);
        }
        else if (resultado.length == 0) {
            html = "<strong style='color : red'>No hay datos de clientes.</strong>";
            $("#bodyAgenda").html(html);
            $("#footerAgenda").html(html_dos);
        }
    }
}
function vistaCliente(id) {
    $.ajax({
        type: "get",
        url: urlServer + "/operativas/clienteid?id=" + id,
        success: function (response) {
            var cliente = {
                id: response[0].id,
                nombre: response[0].nombre,
                apellido: response[0].apellido,
                documento: response[0].documento,
                telefono: response[0].telefono,
                direccion: response[0].direccion,
                email: response[0].email
            };
            var htm = "<table class=\"table table-sm\">\n            <tbody>\n              <tr>\n                <td>Nombre: " + cliente.nombre + "</td>\n              </tr>\n              <tr>\n              <td>Apellido: " + cliente.apellido + "</td>\n              </tr>\n              <tr>\n              <td>Documento: " + cliente.documento + "</td>\n              </tr>\n              <tr>\n              <td>Telefono: " + cliente.telefono + "</td>\n              </tr>\n              <tr>\n              <td>Direccion: " + cliente.direccion + "</td>\n              </tr>\n              <tr>\n              <td>Email: " + cliente.email + "</td>\n              </tr>\n            </tbody>\n          </table>";
            var html = "<ul class=\"list-group list-group-flush\">\n            <li class=\"list-group-item\"><label><strong>Nombre:&nbsp</strong></label>" + cliente.nombre + "</li>\n            <li class=\"list-group-item\"><label><strong>Apellido:&nbsp</strong></label>" + cliente.apellido + "</li>\n            <li class=\"list-group-item\"><label><strong>Documento:&nbsp</strong></label>" + cliente.documento + "</li>\n            <li class=\"list-group-item\"><label><strong>Telefono:&nbsp</strong></label>" + cliente.telefono + "</li>\n            <li class=\"list-group-item\"><label><strong>Direccion:&nbsp</strong></label>" + cliente.direccion + "</li>\n            <li class=\"list-group-item\"><label><strong>Email:&nbsp</strong></label>" + cliente.email + "</li>\n          </ul>";
            $("#vistaClienteBody").html(htm);
            var htmlConfirmaBaja = "<h5>\u00BFEst\u00E1 seguro?</h5>\n            <br>\n            <button class=\"btn btn-danger\" onclick='bajaCliente(" + cliente.id + ")'>Si</button>\n            <button class=\"btn btn-secondary\" data-dismiss=\"modal\">No</button>";
            $("#bodyBajaCliente").html(htmlConfirmaBaja);
            $("#vistaClienteFooter").html("<button onclick=\"modificarCliente(" + cliente.id + ",'" + cliente.nombre + "','" + cliente.apellido + "','" + cliente.documento + "','" + cliente.telefono + "','" + cliente.direccion + "','" + cliente.email + "')\" class=\"btn btn-warning\">Modificar</button>\n            <button class=\"btn btn-danger\" data-toggle=\"modal\" data-backdrop=\"static\" data-keyboard=\"false\" class=\"dropdown-item\" data-target=\"#bajaCliente\">Eliminar</button>");
        },
        error: function (response) {
            alert(response.statusText);
        }
    });
}
function modificarCliente(id, nombre, apellido, documento, telefono, direccion, email) {
    var html = "<ul class=\"list-group list-group-flush\">\n    <li class=\"list-group-item\"><label><strong>Nombre:&nbsp</strong></label><input class=\"form-control\" type=\"text\" id=\"txtMNombre\"></li>\n    <small id=\"eMNombre\" class=\"error\">Ingreso invalido. 1 a 20 caracteres. Solo letras.</small>\n    <li class=\"list-group-item\"><label><strong>Apellido:&nbsp</strong></label><input class=\"form-control\" type=\"text\" id=\"txtMApellido\"></li>\n    <small id=\"eMApellido\" class=\"error\">Ingreso invalido. 1 a 20 caracteres. Solo letras.</small>\n    <li class=\"list-group-item\"><label><strong>Documento:&nbsp</strong></label><input class=\"form-control\" type=\"text\" id=\"txtMDocumento\"></li>\n    <small id=\"eMDocumento\" class=\"error\">Ingreso invalido. 1 a 9 caracteres. Solo numeros.</small>\n    <li class=\"list-group-item\"><label><strong>Telefono:&nbsp</strong></label><input class=\"form-control\" type=\"text\" id=\"txtMTelefono\"></li>\n    <small id=\"eMTelefono\" class=\"error\">Ingreso invalido. 1 a 25 caracteres.</small>\n    <li class=\"list-group-item\"><label><strong>Direccion:&nbsp</strong></label><input class=\"form-control\" type=\"text\" id=\"txtMDireccion\"></li>\n    <small id=\"eMDireccion\" class=\"error\">Ingreso invalido. 1 a 40 caracteres.</small>\n    <li class=\"list-group-item\"><label><strong>Email:&nbsp</strong></label><input class=\"form-control\" type=\"text\" id=\"txtMEmail\"></li>\n    <small id=\"eMEmail\" class=\"error\">Ingreso invalido. Formato incorrecto (ej. nombre@dominio.com)</small>  \n    </ul>";
    $("#vistaClienteBody").html(html);
    $("#eMNombre").hide();
    $("#eMApellido").hide();
    $("#eMDocumento").hide();
    $("#eMTelefono").hide();
    $("#eMDireccion").hide();
    $("#eMEmail").hide();
    $("#txtMNombre").val(nombre);
    $("#txtMApellido").val(apellido);
    $("#txtMDocumento").val(documento);
    $("#txtMTelefono").val(telefono);
    $("#txtMDireccion").val(direccion);
    $("#txtMEmail").val(email);
    var footer = "<button class=\"btn btn-warning\" onclick=\"validarModificarCliente(" + id + ")\">Guardar</button><button class=\"btn btn-secondary\" onclick=\"restablecerVista(" + id + ",'" + nombre + "','" + apellido + "','" + documento + "','" + telefono + "','" + direccion + "','" + email + "')\">Vista</button>";
    $("#vistaClienteFooter").html(footer);
}
function validarModificarCliente(id) {
    var cliente = {
        id: id,
        nombre: $("#txtMNombre").val(),
        apellido: $("#txtMApellido").val(),
        documento: $("#txtMDocumento").val(),
        telefono: $("#txtMTelefono").val(),
        direccion: $("#txtMDireccion").val(),
        email: $("#txtMEmail").val()
    };
    var validaciones = validacion(cliente);
    //Validaciones
    if (validaciones.nombre) {
        $("#txtMNombre").addClass("valido");
    }
    else {
        $("#txtMNombre").addClass("invalido");
        $("#eMNombre").show();
    }
    if (validaciones.apellido) {
        $("#txtMApellido").addClass("valido");
    }
    else {
        $("#txtMApellido").addClass("invalido");
        $("#eMApellido").show();
    }
    if (validaciones.documento) {
        $("#txtMDocumento").addClass("valido");
    }
    else {
        $("#txtMDocumento").addClass("invalido");
        $("#eMDocumento").show();
    }
    if (validaciones.telefono) {
        $("#txtMTelefono").addClass("valido");
    }
    else {
        $("#txtMTelefono").addClass("invalido");
        $("#eMTelefono").show();
    }
    if (validaciones.direccion) {
        $("#txtMDireccion").addClass("valido");
    }
    else {
        $("#txtMDireccion").addClass("invalido");
        $("#eMDireccion").show();
    }
    if (validaciones.email) {
        $("#txtMEmail").addClass("valido");
    }
    else {
        $("#txtMEmail").addClass("invalido");
        $("#eMEmail").show();
    }
    if (validaciones.nombre == true && validaciones.apellido == true && validaciones.documento == true && validaciones.email == true && validaciones.telefono == true && validaciones.direccion == true) {
        $.ajax({
            data: cliente,
            type: "post",
            url: urlServer + "/modificarcliente",
            success: function (response) {
                alert(response.ok);
                $("#btnCerrarVistaCliente").click();
                agendaTemplate();
            },
            error: function (response) {
                alert(response.statusText);
            }
        });
    }
}
function restablecerVista(id, nombre, apellido, documento, telefono, direccion, email) {
    var htm = "<table class=\"table table-sm\">\n            <tbody>\n              <tr>\n                <td>Nombre: " + nombre + "</td>\n              </tr>\n              <tr>\n              <td>Apellido: " + apellido + "</td>\n              </tr>\n              <tr>\n              <td>Documento: " + documento + "</td>\n              </tr>\n              <tr>\n              <td>Telefono: " + telefono + "</td>\n              </tr>\n              <tr>\n              <td>Direccion: " + direccion + "</td>\n              </tr>\n              <tr>\n              <td>Email: " + email + "</td>\n              </tr>\n            </tbody>\n          </table>";
    var footer = "<button onclick=\"modificarCliente(" + id + ",'" + nombre + "','" + apellido + "','" + documento + "','" + telefono + "','" + direccion + "','" + email + "')\" class=\"btn btn-warning\">Modificar</button>\n    <button class=\"btn btn-danger\" data-toggle=\"modal\" data-backdrop=\"static\" data-keyboard=\"false\" class=\"dropdown-item\" data-target=\"#bajaCliente\">Eliminar</button>";
    $("#vistaClienteBody").html(htm);
    $("#vistaClienteFooter").html(footer);
}
function bajaCliente(id) {
    var cliente = { id: id };
    $.ajax({
        data: cliente,
        type: "post",
        url: urlServer + "/bajacliente",
        error: function (response) {
            alert(response.statusText);
        },
        success: function (response) {
            $("#btnCerrarBajaCliente").click();
            $("#btnCerrarVistaCliente").click();
            agendaTemplate();
        }
    });
}
function ucwords(str) {
    return (str + '')
        .replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
        return $1.toUpperCase();
    });
}
