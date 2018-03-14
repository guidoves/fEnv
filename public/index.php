<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';


//MIDDLEWARE

require_once '../mw/Cors.php';
//require_once '../mw/MwValidaciones.php';

//CONTROLLERS
require_once '../controller/EmpleadoController.php';
require_once '../controller/Operativas.php';

$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
        'addContentLengthHeader' => false,
    ],
];
$c = new \Slim\Container($configuration);
$app = new \Slim\App($c);

//$app = new \Slim\App;

$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");

    return $response;
});

//General
$app->post('/nuevocliente', \EmpleadoController::class . ':AltaCliente')->add(\Cors::class . ':HabilitarCORSTodos');
$app->post('/bajacliente', \EmpleadoController::class . ':BajaCliente')->add(\Cors::class . ':HabilitarCORSTodos');
//Operativas
$app->get('/operativas/clientesordenados', \Operativas::class . ':traerClientesOrdenados')->add(\Cors::class . ':HabilitarCORSTodos');
$app->get('/operativas/clienteid', \Operativas::class . ':traerCliente')->add(\Cors::class . ':HabilitarCORSTodos');

//Rutas Solo Admin
//$app->post('/nuevoempleado', \EmpleadoController::class . ':NuevoEmpleado')->add(\MWValidaciones::class . ':ValidarNuevoEmpleado')->add(\ValidacionPermisos::class . ':VerificarAdmin');


$app->run();

?>