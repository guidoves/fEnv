<?php
require_once "../model/Clientes.php";

class EmpleadoController{

    public function AltaCliente($request,$response){

        $cliente = new Clientes();
        $cliente->nombre = $request->getParsedBody()["nombre"];
        $cliente->apellido = $request->getParsedBody()["apellido"];
        $cliente->documento = $request->getParsedBody()["documento"];
        $cliente->telefono = $request->getParsedBody()["telefono"];
        $cliente->direccion = $request->getParsedBody()["direccion"];
        $cliente->email = $request->getParsedBody()["email"];
        try{
            $id = $cliente->alta();
            $respuesta = new stdclass();
            $respuesta->ok = "Cliente dado de alta ID: " . $id;
            return $response->withJson($respuesta,200);
        }
        catch(Exception $ex){
            $respuesta = new stdclass();
            $respuesta->error = $ex->getMessage();
            return $response->withJson($respuesta,500);
        }
    }
}


?>