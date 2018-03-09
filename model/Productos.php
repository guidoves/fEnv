<?php
require_once 'AccesoDatos.php';

class Productos{

    public $id;
    public $nombre;
    public $idPedido;
    public $idOSocial;

    //ABM

    public function alta(){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("INSERT into productos (nombre,idPedido,idOSocial) values('$this->nombre','$this->idPedido','$this->idOSocial')");
        $consulta->execute();
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }

    public function modificar(){
    
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE productos
        set nombre=:nombre,
        idPedido=:idPedido,
        idOSocial=:idOSocial
        WHERE id=:id");
        $consulta->bindValue(':id',$this->id,PDO::PARAM_INT);
        $consulta->bindValue(':nombre',$this->id,PDO::PARAM_STR);
        $consulta->bindValue(':idPedido',$this->idPedido,PDO::PARAM_INT);
        $consulta->bindValue(':idOSocial',$this->tipo,PDO::PARAM_INT);
        return $consulta->execute();
    }

    public static function bajaPorId($id){
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("
        delete 
        from productos 				
        WHERE id=:id");	
        $consulta->bindValue(':id',$id, PDO::PARAM_INT);		
        $consulta->execute();
        return $consulta->rowCount();
    }

    public static function traerTodos(){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT id,nombre,idPedido,idOSocial FROM productos");
        $consulta->execute();			
        return $consulta->fetchAll(PDO::FETCH_CLASS,"Productos");
    }

    public static function buscarPorId($id){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id,nombre,idPedido,idOSocial FROM productos WHERE id=:id");
        $consulta->bindValue(':id',$id,PDO::PARAM_INT);
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS,"Productos");

    }
    
}


?>