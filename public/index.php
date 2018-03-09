<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';


//MIDDLEWARE

//require_once '../mw/Cors.php';
//require_once '../mw/MwValidaciones.php';

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


//Rutas Solo Admin
//$app->post('/nuevoempleado', \EmpleadoController::class . ':NuevoEmpleado')->add(\MWValidaciones::class . ':ValidarNuevoEmpleado')->add(\ValidacionPermisos::class . ':VerificarAdmin');


$app->run();

?>