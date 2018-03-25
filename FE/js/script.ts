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
    let nombre: string = String($("#txtNombre").val());
    let apellido: string = String($("#txtApellido").val());
    let documento: string = String($("#txtDocumento").val());
    let telefono: string = String($("#txtTelefono").val());
    let direccion: string = String($("#txtDireccion").val());
    let email: string = String($("#txtEmail").val());

    let cliente = {
        nombre: nombre,
        apellido: apellido,
        documento: documento,
        telefono: telefono,
        direccion: direccion,
        email: email
    };

    let validaciones = validacion(cliente);

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

function validacion(cliente: any) {

    let validacion = {
        nombre: true,
        apellido: true,
        documento: true,
        telefono: true,
        direccion: true,
        email: true
    };
    //Reglas de validacion
    let regNombreApellido = new RegExp("^[a-zA-ZÑñáéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ \s]{1,20}$");
    let regDocumento = new RegExp("^\\d{0,9}$");
    //let regTelefono = new RegExp("^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$");
    let regEmail = new RegExp("^[0-9a-z_\\-\\.]+@[0-9a-z\\-\\.]+\\.[a-z]{2,4}$");

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
    let nombre = $('#txtNombre').val();
    let apellido = $('#txtApellido').val();
    let documento = $('#txtDocumento').val();
    let telefono = $('#txtTelefono').val();
    let direccion = $('#txtDireccion').val();
    let email = $('#txtEmail').val();

    let cliente = {
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
        success: function (response, status, xhr) {
            if (xhr.status == 200) {
                console.log(response);
                $("#btnCerrarAltaCliente").click();
                agendaTemplate();
            }
            else if (xhr.status == 202) {
                let mensaje = "";
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
    let template: string = `<div class="agenda">
    <div class="card">
        <div class="card-header">
            <div class="card-title">
                <div class="contenedor">
                    <div class="elementoAgenda">
                        <strong>AGENDA DE CLIENTES</strong>
                    </div>
                    <div class="elementoAgenda">
                        <form class="form-inline my-2 my-lg-0">
                            <input id="txtBuscarCliente" class="form-control mr-sm-2" type="search" placeholder="Ingrese dato..">
                            <button id="btnBuscarCliente" class="btn btn-outline-success my-2 my-sm-2" type="submit">Buscar Cliente</button>
                        </form>
                    </div>
                </div>
            </div>
        
        </div>
        <div class="card-body">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Apellido</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Documento</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody id="bodyAgenda">
                </tbody>
            </table>
        </div>
    </div>
</div>`;

    $.ajax({
        type: "get",
        url: "http://localhost/workspace/fEnv/public/operativas/clientesordenados",
        success: function (response) {
            $("#index").html(template);
            let body: string = "";

            for (let index = 0; index < response.length; index++) {
                body += "<tr><td>" + response[index].apellido + "</td><td>" + response[index].nombre + "</td><td>" + response[index].documento + "</td><td><button class='btn btn-info' data-controls-modal='vistaCliente' data-backdrop='static' data-keyboard='false' class='dropdown-item' data-toggle='modal' data-target='#vistaCliente' onclick='vistaCliente(" + response[index].id + ")'>Detalle</button></td></tr>";

            }
            $("#bodyAgenda").html(body);

            $("#btnBuscarCliente").on("click", function () {
                buscarCliente(response);
            });

        },
        error: function (response) {
            alert(response.statusText);
        }
    });
}
function buscarCliente(clientes: any[]) {
    let valor: string = String($("#txtBuscarCliente").val());
    valor = ucwords(valor.toLowerCase());

    let resultado = clientes.filter(function (cliente) {
        return cliente.nombre == valor || cliente.apellido == valor || cliente.documento == valor || cliente.telefono == valor || cliente.email == valor;
    });
    let html = "";
    if (resultado.length != 0) {

        for (let index = 0; index < resultado.length; index++) {
            html += "<tr><td>" + resultado[index].apellido + "</td><td>" + resultado[index].nombre + "</td><td>" + resultado[index].documento + "</td><td><button class='btn btn-info' data-controls-modal='vistaCliente' data-backdrop='static' data-keyboard='false' class='dropdown-item' data-toggle='modal' data-target='#vistaCliente' onclick='vistaCliente(" + resultado[index].id + ")'>Detalle</button></td></tr>";

        }
    }
    else {
        html = "<strong style='color : red'>No hay datos de clientes.</strong>";
    }
    $("#bodyAgenda").html(html);
}


function vistaCliente(id: number) {


    $.ajax({
        type: "get",
        url: "http://localhost/workspace/fEnv/public/operativas/clienteid?id=" + id,
        success: function (response) {
            let cliente = {
                id: response[0].id,
                nombre: response[0].nombre,
                apellido: response[0].apellido,
                documento: response[0].documento,
                telefono: response[0].telefono,
                direccion: response[0].direccion,
                email: response[0].email
            };
            let htm = `<table class="table table-sm">
            <tbody>
              <tr>
                <td>Nombre: `+ cliente.nombre + `</td>
              </tr>
              <tr>
              <td>Apellido: `+ cliente.apellido + `</td>
              </tr>
              <tr>
              <td>Documento: `+ cliente.documento + `</td>
              </tr>
              <tr>
              <td>Telefono: `+ cliente.telefono + `</td>
              </tr>
              <tr>
              <td>Direccion: `+ cliente.direccion + `</td>
              </tr>
              <tr>
              <td>Email: `+ cliente.email + `</td>
              </tr>
            </tbody>
          </table>`;
            let html = `<ul class="list-group list-group-flush">
            <li class="list-group-item"><label><strong>Nombre:&nbsp</strong></label>`+ cliente.nombre + `</li>
            <li class="list-group-item"><label><strong>Apellido:&nbsp</strong></label>`+ cliente.apellido + `</li>
            <li class="list-group-item"><label><strong>Documento:&nbsp</strong></label>`+ cliente.documento + `</li>
            <li class="list-group-item"><label><strong>Telefono:&nbsp</strong></label>`+ cliente.telefono + `</li>
            <li class="list-group-item"><label><strong>Direccion:&nbsp</strong></label>`+ cliente.direccion + `</li>
            <li class="list-group-item"><label><strong>Email:&nbsp</strong></label>`+ cliente.email + `</li>
          </ul>`;
            $("#vistaClienteBody").html(htm);
            let htmlConfirmaBaja = `<h5>¿Está seguro?</h5>
            <br>
            <button class="btn btn-danger" onclick='bajaCliente(`+ cliente.id + `)'>Si</button>
            <button class="btn btn-secondary" data-dismiss="modal">No</button>`;
            $("#bodyBajaCliente").html(htmlConfirmaBaja);
            $("#vistaClienteFooter").html(`<button onclick="modificarCliente(` + cliente.id + `,'` + cliente.nombre + `','` + cliente.apellido + `','` + cliente.documento + `','` + cliente.telefono + `','` + cliente.direccion + `','` + cliente.email + `')" class="btn btn-warning">Modificar</button>
            <button class="btn btn-danger" data-toggle="modal" data-backdrop="static" data-keyboard="false" class="dropdown-item" data-target="#bajaCliente">Eliminar</button>`);

        },
        error: function (response) {
            alert(response.statusText);
        }

    });
}

function modificarCliente(id: number, nombre: string, apellido: string, documento: number, telefono: string, direccion: string, email: string) {
    let html = `<ul class="list-group list-group-flush">
    <li class="list-group-item"><label><strong>Nombre:&nbsp</strong></label><input class="form-control" type="text" id="txtMNombre"></li>
    <small id="eMNombre" class="error">Ingreso invalido. 1 a 20 caracteres. Solo letras.</small>
    <li class="list-group-item"><label><strong>Apellido:&nbsp</strong></label><input class="form-control" type="text" id="txtMApellido"></li>
    <small id="eMApellido" class="error">Ingreso invalido. 1 a 20 caracteres. Solo letras.</small>
    <li class="list-group-item"><label><strong>Documento:&nbsp</strong></label><input class="form-control" type="text" id="txtMDocumento"></li>
    <small id="eMDocumento" class="error">Ingreso invalido. 1 a 9 caracteres. Solo numeros.</small>
    <li class="list-group-item"><label><strong>Telefono:&nbsp</strong></label><input class="form-control" type="text" id="txtMTelefono"></li>
    <small id="eMTelefono" class="error">Ingreso invalido. 1 a 25 caracteres.</small>
    <li class="list-group-item"><label><strong>Direccion:&nbsp</strong></label><input class="form-control" type="text" id="txtMDireccion"></li>
    <small id="eMDireccion" class="error">Ingreso invalido. 1 a 40 caracteres.</small>
    <li class="list-group-item"><label><strong>Email:&nbsp</strong></label><input class="form-control" type="text" id="txtMEmail"></li>
    <small id="eMEmail" class="error">Ingreso invalido. Formato incorrecto (ej. nombre@dominio.com)</small>  
    </ul>`;
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

    let footer = `<button class="btn btn-warning" onclick="validarModificarCliente(` + id + `)">Guardar</button><button class="btn btn-secondary" onclick="restablecerVista(` + id + `,'` + nombre + `','` + apellido + `','` + documento + `','` + telefono + `','` + direccion + `','` + email + `')">Vista</button>`;
    $("#vistaClienteFooter").html(footer);
}

function validarModificarCliente(id: number) {
    let cliente = {
        id: id,
        nombre: $("#txtMNombre").val(),
        apellido: $("#txtMApellido").val(),
        documento: $("#txtMDocumento").val(),
        telefono: $("#txtMTelefono").val(),
        direccion: $("#txtMDireccion").val(),
        email: $("#txtMEmail").val()
    };

    let validaciones = validacion(cliente);

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
            url: "http://localhost/workspace/fEnv/public/modificarcliente",
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

function restablecerVista(id: number, nombre: string, apellido: string, documento: number, telefono: string, direccion: string, email: string) {
    let htm = `<table class="table table-sm">
            <tbody>
              <tr>
                <td>Nombre: `+ nombre + `</td>
              </tr>
              <tr>
              <td>Apellido: `+ apellido + `</td>
              </tr>
              <tr>
              <td>Documento: `+ documento + `</td>
              </tr>
              <tr>
              <td>Telefono: `+ telefono + `</td>
              </tr>
              <tr>
              <td>Direccion: `+ direccion + `</td>
              </tr>
              <tr>
              <td>Email: `+ email + `</td>
              </tr>
            </tbody>
          </table>`;
    let footer = `<button onclick="modificarCliente(` + id + `,'` + nombre + `','` + apellido + `','` + documento + `','` + telefono + `','` + direccion + `','` + email + `')" class="btn btn-warning">Modificar</button>
    <button class="btn btn-danger" data-toggle="modal" data-backdrop="static" data-keyboard="false" class="dropdown-item" data-target="#bajaCliente">Eliminar</button>`;
    $("#vistaClienteBody").html(htm);
    $("#vistaClienteFooter").html(footer);
}

function bajaCliente(id: number) {
    let cliente = { id: id };
    $.ajax({
        data: cliente,
        type: "post",
        url: "http://localhost/workspace/fEnv/public/bajacliente",
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
      .replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1) {
        return $1.toUpperCase();
      });
  }