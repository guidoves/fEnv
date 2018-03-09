<?php
require_once 'AccesoDatos.php';

class Vendedores{

    public $id;
    public $nombre;

    //ABM

    public function alta(){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("INSERT into vendedores (nombre) values('$this->nombre')");
        $consulta->execute();
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }

    public function modificar(){
    
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE vendedores
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
        from vendedores 				
        WHERE id=:id");	
        $consulta->bindValue(':id',$id, PDO::PARAM_INT);		
        $consulta->execute();
        return $consulta->rowCount();
    }

    public static function traerTodos(){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT id,nombre FROM vendedores");
        $consulta->execute();			
        return $consulta->fetchAll(PDO::FETCH_CLASS,"Vendedores");
    }

    public static function buscarPorId($id){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id,nombre FROM vendedores WHERE id=:id");
        $consulta->bindValue(':id',$id,PDO::PARAM_INT);
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS,"Vendedores");

    }
}

?>