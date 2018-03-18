
<?php
require_once '../model/Clientes.php';

class MwValidaciones{

    public function ValidarNuevoCliente($request,$response,$next){

        $errores = array();
        $dataOk = array();
        $reg_nombre_apellido = "/^[a-zA-ZÑñáéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ \s]{1,20}$/";
        $reg_email = "/^[0-9a-z_\\-\\.]+@[0-9a-z\\-\\.]+\\.[a-z]{2,4}$/";
        $reg_documento = "/^\\d{0,9}$/";
        
        //Comprueba si llegaron los campos requeridos
        if(isset($request->getParsedBody()['nombre']) && isset($request->getParsedBody()['email']) && 
        isset($request->getParsedBody()['apellido']) && isset($request->getParsedBody()['documento']) &&
        isset($request->getParsedBody()['telefono']) && isset($request->getParsedBody()['direccion'])){
            //nombre
            if(!empty($request->getParsedBody()['nombre'])){
                if(preg_match($reg_nombre_apellido,$request->getParsedBody()['nombre'])){
                    $dataOk['nombre'] = 'nombre';
                }
                else{
                    $errores['nombre'] = 'Ingreso invalido. Solo letras';
                }
            }
            else{
                $errores['nombre'] = "El nombre esta vacio";
            }
            //apellido
            if(!empty($request->getParsedBody()['apellido'])){
                if(preg_match($reg_nombre_apellido,$request->getParsedBody()['apellido'])){
                    $dataOk['apellido'] = 'apellido';
                }
                else{
                    $errores['apellido'] = 'Ingreso invalido. Solo letras';
                }
            }
            else{
                $errores['apellido'] = "El apellido esta vacio";
            }
            //email
            if(!empty($request->getParsedBody()['email'])){
                if(preg_match($reg_email,$request->getParsedBody()['email'])){
                    if(count(Clientes::buscarPorEmail($request->getParsedBody()["email"])) == 0)
                    {
                        $dataOk['email'] = "email";
                    }
                    else{
                        $errores['email'] = "El email ya se encuentra registrado";
                    }
                }
                else{
                    $errores['email'] = "Ingreso invalido. Formato invalido";
                }
            }
            else{
                $dataOk['email'] = "email";
            }
            //documento
            if(!empty($request->getParsedBody()['documento'])){
                if(preg_match($reg_documento,$request->getParsedBody()['documento'])){
                    if(count(Clientes::buscarPorDocumento($request->getParsedBody()["documento"])) == 0)
                    {
                        $dataOk['documento'] = "documento";
                    }
                    else{
                        $errores['documento'] = "El documento ya se encuentra registrado";
                    }
                }
                else{
                    $errores['documento'] = "Ingreso invalido. Formato invalido";
                }
            }
            else{
                $dataOk['documento'] = "documento";
            }
            //telefono
            if(!empty($request->getParsedBody()['telefono'])){
                if(count($request->getParsedBody()['telefono']) > 0 && count($request->getParsedBody()['telefono']) < 25 ){
                    $dataOk['telefono'] = "telefono";
                }
                else{
                    $errores['telefono'] = "Ingreso invalido. Formato invalido";
                }
            }
            else{
                $errores['telefono'] = "El telefono esta vacio";
            }
            //direccion
            if(!empty($request->getParsedBody()['direccion'])){
                if(count($request->getParsedBody()['direccion']) > 0 && count($request->getParsedBody()['direccion']) < 51){
                
                    $dataOk['direccion'] = "direccion";
                }
                else{
                    $errores['direccion'] = "Ingreso invalido. Formato invalido";
                }
            }
            else{
                $errores['direccion'] = "La direccion esta vacia";
            }
            
            if(count($dataOk) == 6){
                //TODO OK!
                $response = $next($request,$response);

                return $response;
            }
            else{
                //HAY ERRORES.
                return $response->withJson($errores,202);
            }
        }
        else{
            $response->write('No se han especificado los campos requeridos');
            $response->withStatus(400);
            return $response;
        }

    }


}




?>