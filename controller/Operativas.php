<?php
require_once "../model/Clientes.php";

class Operativas{
    
    public function traerClientesOrdenados($request,$response){
        
        $clientes = Clientes::traerTodosOrdenadosPorNombre();
        if($clientes != null){
            return $response->withJson($clientes,200);
        }
        else{
            $respuesta = new stdclass();
            $respuesta->error = "sin datos";
            return $response->withJson($respuesta,404);
        }
    }

    public function traerCliente($request,$response){
        
        $cliente = Clientes::buscarPorId($request->getQueryParams()["id"]);
        if($cliente != null){
            return $response->withJson($cliente,200);
        }
        else{
            $respuesta = new stdclass();
            $respuesta->error = "fallo, cliente no encontrado";
            return $response->withJson($respuesta,500);
        }
    }
}

?>