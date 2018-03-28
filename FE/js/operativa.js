"use strict";
function nuevaOperacion() {
}
function busquedaClienteOperacion() {
    var valor = String($("#txtBuscarClienteOperacion").val());
    var resultado = '';
    $.ajax({
        type: "get",
        url: urlServer + "/operativas/clientesordenados",
        success: function (response) {
            resultado = buscarCliente(valor, response);
            alert(resultado.nombre);
        },
        error: function (response) {
            alert(response.statusText);
        }
    });
}
