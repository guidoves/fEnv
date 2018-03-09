<?php
require_once 'AccesoDatos.php';

class Envios{

    public $id;
    public $idCliente;
    public $idPedido;
    public $idVendedor;
    public $idRepartidor;
    public $fechaInicio;
    public $fechaFin;
    public $estado;

    //ABM

    public function alta(){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("INSERT into envios (idCliente,idPedido,idVendedor,idRepartidor,fechaInicio,fechaFin,estado) values('$this->idCliente','$this->idPedido','$this->idVendedor','$this->idRepartidor','$this->fechaInicio','$this->fechaFin','$this->estado')");
        $consulta->execute();
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }

    public function modificar(){
    
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE envios
        set idCliente=:idCliente,
        idPedido=:idPedido,
        idVendedor=:idVendedor,
        idRepartidor=:idRepartidor,
        fechaInicio=:fechaInicio,
        fechaFin=:fechaFin
        estado=:estado
        WHERE id=:id");
        $consulta->bindValue(':id',$this->id,PDO::PARAM_INT);
        $consulta->bindValue(':idCliente',$this->idCliente,PDO::PARAM_INT);
        $consulta->bindValue(':idPedido',$this->idPedido,PDO::PARAM_INT);
        $consulta->bindValue(':idVendedor',$this->idVendedor,PDO::PARAM_INT);
        $consulta->bindValue(':idRepartidor',$this->idRepartidor,PDO::PARAM_INT);
        $consulta->bindValue(':fechaInicio',$this->fechaInicio,PDO::PARAM_STR);
        $consulta->bindValue(':fechaFin',$this->fechaFin,PDO::PARAM_STR);
        $consulta->bindValue(':estado',$this->estado,PDO::PARAM_STR);
        return $consulta->execute();
    }

    public static function bajaPorId($id){
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("
        delete 
        from envios 				
        WHERE id=:id");	
        $consulta->bindValue(':id',$id, PDO::PARAM_INT);		
        $consulta->execute();
        return $consulta->rowCount();
    }

    public static function traerTodos(){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT id,idCliente,idPedido,idVendedor,idRepartidor,fechaInicio,fechaFin,estado FROM envios");
        $consulta->execute();			
        return $consulta->fetchAll(PDO::FETCH_CLASS,"Envios");
    }

    public static function buscarPorId($id){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id,idCliente,idPedido,idVendedor,idRepartidor,fechaInicio,fechaFin,estado FROM envios WHERE id=:id");
        $consulta->bindValue(':id',$id,PDO::PARAM_INT);
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS,"Envios");

    }
}

?>