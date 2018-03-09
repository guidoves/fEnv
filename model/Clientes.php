<?php
require_once 'AccesoDatos.php';

class Clientes{

    public $id;
    public $nombre;
    public $apellido;
    public $documento;
    public $telefono;
    public $direccion;
    public $email;


    //ABM

    public function alta(){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("INSERT into clientes (nombre,apellido,documento,telefono,direccion,email) values('$this->nombre','$this->apellido','$this->documento','$this->telefono','$this->direccion','$this->email')");
        $consulta->execute();
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }

    public function modificar(){
    
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE clientes
        set nombre=:nombre,
        apellido=:apellido,
        documento=:documento,
        telefono=:telefono,
        direccion=:direccion,
        email=:email
        WHERE id=:id");
        $consulta->bindValue(':id',$this->id,PDO::PARAM_INT);
        $consulta->bindValue(':nombre',$this->nombre,PDO::PARAM_STR);
        $consulta->bindValue(':apellido',$this->apellido,PDO::PARAM_STR);
        $consulta->bindValue(':documento',$this->documento,PDO::PARAM_STR);
        $consulta->bindValue(':telefono',$this->telefono,PDO::PARAM_STR);
        $consulta->bindValue(':direccion',$this->direccion,PDO::PARAM_STR);
        $consulta->bindValue(':email',$this->email,PDO::PARAM_STR);
        return $consulta->execute();
    }

    public static function bajaPorId($id){
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("
        delete 
        from clientes 				
        WHERE id=:id");	
        $consulta->bindValue(':id',$id, PDO::PARAM_INT);		
        $consulta->execute();
        return $consulta->rowCount();
    }

    public static function traerTodos(){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT id,nombre,apellido,documento,telefono,direccion,email FROM clientes");
        $consulta->execute();			
        return $consulta->fetchAll(PDO::FETCH_CLASS,"Clientes");
    }

    public static function buscarPorId($id){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id,nombre,apellido,documento,telefono,direccion,email FROM clientes WHERE id=:id");
        $consulta->bindValue(':id',$id,PDO::PARAM_INT);
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS,"Clientes");

    }
}


?>