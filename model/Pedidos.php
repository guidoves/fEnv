<?php
require_once 'AccesoDatos.php';

class Pedidos{

    public $id;
    public $importe;
    public $tipo;

    //ABM

    public function alta(){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("INSERT into pedidos (importe,tipo) values('$this->importe','$this->tipo')");
        $consulta->execute();
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }

    public function modificar(){
    
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE pedidos
        set importe=:importe,
        tipo=:tipo,
        WHERE id=:id");
        $consulta->bindValue(':id',$this->id,PDO::PARAM_INT);
        $consulta->bindValue(':importe',$this->idPedido,PDO::PARAM_STR);
        $consulta->bindValue(':tipo',$this->tipo,PDO::PARAM_STR);
        return $consulta->execute();
    }

    public static function bajaPorId($id){
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("
        delete 
        from pedidos 				
        WHERE id=:id");	
        $consulta->bindValue(':id',$id, PDO::PARAM_INT);		
        $consulta->execute();
        return $consulta->rowCount();
    }

    public static function traerTodos(){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT id,importe,tipo FROM pedidos");
        $consulta->execute();			
        return $consulta->fetchAll(PDO::FETCH_CLASS,"Pedidos");
    }

    public static function buscarPorId($id){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id,importe,tipo FROM pedidos WHERE id=:id");
        $consulta->bindValue(':id',$id,PDO::PARAM_INT);
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS,"Pedidos");

    }

}



?>