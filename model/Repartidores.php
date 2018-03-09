<?php
require_once 'AccesoDatos.php';

class Repartidores{

    public $id;
    public $nombre;

    //ABM

    public function alta(){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("INSERT into repartidores (nombre) values('$this->nombre')");
        $consulta->execute();
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }

    public function modificar(){
    
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE repartidores
        set nombre=:nombre,
        WHERE id=:id");
        $consulta->bindValue(':id',$this->id,PDO::PARAM_INT);
        $consulta->bindValue(':nombre',$this->id,PDO::PARAM_STR);
        return $consulta->execute();
    }

    public static function bajaPorId($id){
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("
        delete 
        from repartidores 				
        WHERE id=:id");	
        $consulta->bindValue(':id',$id, PDO::PARAM_INT);		
        $consulta->execute();
        return $consulta->rowCount();
    }

    public static function traerTodos(){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT id,nombre FROM repartidores");
        $consulta->execute();			
        return $consulta->fetchAll(PDO::FETCH_CLASS,"Repartidores");
    }

    public static function buscarPorId($id){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id,nombre FROM repartidores WHERE id=:id");
        $consulta->bindValue(':id',$id,PDO::PARAM_INT);
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS,"Repartidores");

    }
}

?>