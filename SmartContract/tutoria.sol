pragma solidity ^0.4.7;
contract Tutoria {
    
    string materia;
    address idProfesor;
    address alumno;
    bool confirmarTut;
    bool cancelarTut;
    
    constructor (string mater, address idProf, address alum) public{
        require(alum != idProf);
        materia = mater;
        idProfesor = idProf;
        alumno = alum;
        confirmarTut = false;
        cancelarTut = false;
    }
    
    function getMateria() public returns (string) {
        return materia;
    }
    
    function getIdProfesor() public returns (address) {
        return idProfesor;
    }
    
    function getAlumno() public returns (address) {
        return alumno;
    }
    
    function confirmar() public returns (bool) {
        require(idProfesor == msg.sender);
        require(confirmarTut == false);
        return confirmarTut = true;
    }
    
    function cancelar() public returns (address) {
        require(alum == msg.sender);
        require(confirmarTut == false);
        require(cancelarTut = false);
        return cancelarTut = true;
    }
    
    function estaConfirmado() public returns (bool){
        return confirmarTut;
    }
    
}