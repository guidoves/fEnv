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
    let regNombreApellido = new RegExp("^[a-zA-ZÑñáéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ\s]{1,20}$");
    let regDocumento = new RegExp("^\\d{0,9}$");
    //let regTelefono = new RegExp("^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$");
    let regEmail = new RegExp("^[0-9a-z_\\-\\.]+@[0-9a-z\\-\\.]+\\.[a-z]{2,4}$");

    //Valores del formulario
    let nombre: string = String($("#txtNombre").val());
    let apellido: string = String($("#txtApellido").val());
    let documento: string = String($("#txtDocumento").val());
    let telefono: string = String($("#txtTelefono").val());
    let direccion: string = String($("#txtDireccion").val());
    let email: string = String($("#txtEmail").val());

    let validacion: boolean = true;

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
    let template: string = `<div class="agenda">
    <div class="card">
        <div class="card-title">
            <strong>AGENDA DE CLIENTES</strong>
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
                body += "<tr><td>" + response[index].apellido + "</td><td>" + response[index].nombre + "</td><td>" + response[index].documento + "</td><td><button class='btn btn-link' data-controls-modal='vistaCliente' data-backdrop='static' data-keyboard='false' class='dropdown-item' data-toggle='modal' data-target='#vistaCliente' onclick='vistaCliente("+response[index].id+")'>Ver</button></td></tr>";

            }
            $("#bodyAgenda").html(body);

        },
        error: function (response) {
            alert(response.statusText);
        }
    });
}

function vistaCliente(id:number){
    

    $.ajax({
        type : "get",
        url : "http://localhost/workspace/fEnv/public/operativas/clienteid?id="+id,
        success: function(response){
            let html = `<div><label for="">Nombre:&nbsp</label>`+response[0].nombre+`</div><br>
            <div><label for="">Apellido:&nbsp</label>`+response[0].apellido+`</div><br>
            <div><label for="">Documento:&nbsp</label>`+response[0].documento+`</div><br>
            <div><label for="">Telefono:&nbsp</label>`+response[0].telefono+`</div><br>
            <div><label for="">Direccion:&nbsp</label>`+response[0].direccion+`</div><br>
            <div><label for="">Email:&nbsp</label>`+response[0].email+`</div><br>`;
            $("#vistaClienteBody").html(html);  
        },      
        error: function (response){
            alert(response.statusText);
        }

    });
}

function bajaCliente(id:number){
    
}