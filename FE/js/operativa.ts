

function nuevaOperacion(){

}

function busquedaClienteOperacion(){
    let valor = String($("#txtBuscarClienteOperacion").val());
    let resultado = '';
    $.ajax({
        type : "get",
        url : urlServer + "/operativas/clientesordenados",
        success: function(response){
            resultado = buscarCliente(valor,response);
            alert(resultado.nombre);
        },
        error: function (response) {
            alert(response.statusText);
        }
    });

    
}

