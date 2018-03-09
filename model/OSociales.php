<?php
require_once 'AccesoDatos.php';

class OSociales{

    public $id;
    public $idPedido;
    public $fecha;
    public $nAfiliado;
    public $matricula;
    public $nObraSocial;
    public $otrosDatos;

    //ABM

    public function alta(){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("INSERT into oSociales (idPedido,fecha,nAfiliado,matricula,nObraSocial,otrosDatos) values('$this->idPedido','$this->fecha','$this->nAfiliado','$this->matricula','$this->nObraSocial','$this->otrosDatos')");
        $consulta->execute();
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }

    public function modificar(){
    
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE oSociales
        set idPedido=:idPedido,
        fecha=:fecha,
        nAfiliado=:nAfiliado,
        matricula=:matricula,
        nObraSocial=:nObraSociala,
        otrosDatos=:otrosDatos
        WHERE id=:id");
        $consulta->bindValue(':id',$this->id,PDO::PARAM_INT);
        $consulta->bindValue(':idPedido',$this->idPedido,PDO::PARAM_INT);
        $consulta->bindValue(':fecha',$this->fecha,PDO::PARAM_STR);
        $consulta->bindValue(':nAfiliado',$this->nAfiliado,PDO::PARAM_STR);
        $consulta->bindValue(':matricula',$this->matricula,PDO::PARAM_INT);
        $consulta->bindValue(':nObraSocial',$this->nObraSocial,PDO::PARAM_STR);
        $consulta->bindValue(':otrosDatos',$this->otrosDatos,PDO::PARAM_STR);
        return $consulta->execute();
    }

    public static function bajaPorId($id){
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("
        delete 
        from oSociales 				
        WHERE id=:id");	
        $consulta->bindValue(':id',$id, PDO::PARAM_INT);		
        $consulta->execute();
        return $consulta->rowCount();
    }

    public static function traerTodos(){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT id,idPedido,fecha,nAfiliado,matricula,nObraSocial,otrosDatos FROM oSociales");
        $consulta->execute();			
        return $consulta->fetchAll(PDO::FETCH_CLASS,"OSociales");
    }

    public static function buscarPorId($id){

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id,idPedido,fecha,nAfiliado,matricula,nObraSocial,otrosDatos FROM oSociales WHERE id=:id");
        $consulta->bindValue(':id',$id,PDO::PARAM_INT);
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS,"OSociales");

    }
}

?>