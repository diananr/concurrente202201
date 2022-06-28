//SPDX-License-Identifier: GLP-3.0
pragma solidity >0.4.0 <0.9.0;


contract Subasta{
    mapping(address => uint) postores;

    //Agregar una nueva apuesta
    function agregarApuesta() public payable{

    }
    //Obtener el balance del contrato del usuario
    function obtenerContratoBalance() public view returns(uint){
        return address(this).balance;
    }
    
    //Obtener la apuesta mayor

    //Obtener la dirección del apostador mayor
}