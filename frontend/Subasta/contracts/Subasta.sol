//SPDX-License-Identifier: GLP-3.0
pragma solidity >0.4.0 <0.9.0;


contract Subasta{
    mapping(address => uint) postoresData;
    uint apuestaMayor;
    address postorMayor;
    uint tiempoInicio = block.timestamp;
    uint tiempoFin;



    //Agregar una nueva apuesta
    function agregarApuesta() public payable{
        //Conficional que la apuesta no sea cero
        uint calcularMonto = postoresData[msg.sender]+msg.value;
        require(msg.value > 0, "La apuesta debe ser mayor a 0");
        // //Verificar que la subasta no expiró
        require(block.timestamp<=tiempoFin, "La subasta ya termino");
        //Verificar Apuesta Mayor
        require(calcularMonto > apuestaMayor, "Su monto esta por debajo de la Apuesta Mayor");
        postoresData[msg.sender] = calcularMonto;
        apuestaMayor = calcularMonto;
        postorMayor=msg.sender;
    }
    //Obtener el balance del contrato del usuario
    function obtenerContratoBalance(address _address) public view returns(uint){
        return postoresData[_address];
    }
    
    //Obtener la apuesta mayor
    function ApuestaMayor() public view returns(uint){
        return apuestaMayor;
    }

    //Obtener la dirección del apostador mayor
    function MayorPostorAddr() public view returns(address){
        return postorMayor;
    }

    //Hora que termina la Subasta
    function crearTiempoFin(uint _tiempoFin) public {
        tiempoFin = _tiempoFin;
    }

    //Retirar Apuesta
    function RetirarApuesta(address payable _address) public{
        if(postoresData[_address]>0){
            _address.transfer(postoresData[_address]);
        }
    }
}