pragma solidity ^0.4.7;
contract Tutoria {
    
    string materia;
    address idProfesor;
    address alumno;
    bool confirmarTut;
    
    constructor (string mater, address idProf) public{
        require(alum != idProf);
        materia = mater;
        idProfesor = idProf;
        alumno = msg.sender;
        confirmarTut = false;
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
        return confirmarTut = true;
    }
    
    function cancelar() public returns (address) {
        
    }
    
    function estaConfirmado() public returns (bool){
        return confirmarTut;
    }
    
}