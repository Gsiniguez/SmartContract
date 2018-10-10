pragma solidity ^0.4.7;
contract Tutoria {
    
    
    
    struct tutoriaData {
        string materia;
        address idProfesor;
        address alumno;
        bool isConfirmado;
        bool isCancelado;
    }
    
    function pedir(string mater, address idProf, address alum) public{
        require(alum != idProf);
        materia = mater;
        idProfesor = idProf;
        alumno = alum;
        isConfirmado = false;
        isCancelado = false;
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
        require(isConfirmado == false);
        return isConfirmado = true;
    }
    
    function cancelar() public returns (address) {
        require(alum == msg.sender);
        require(isConfirmado == false);
        require(isCancelado = false);
        return isCancelado = true;
    }
    
    function estaConfirmado() public returns (bool){
        return isConfirmado;
    }
    
}