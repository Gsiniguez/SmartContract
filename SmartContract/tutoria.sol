pragma solidity ^0.4.7;
contract Tutoria {
    
    mapping (address => TutoriaData)  Tutorias;
    
    
    struct TutoriaData {
        string materia;
        address idProfesor;
        address alumno;
        bool isConfirmado;
        bool isCancelado;
    }
    
    function solicitar(string mater, address idProf, address alum) public{
        TutoriaData t = Tutorias[msg.sender];
        require(alum != idProf);
        t.materia = mater;
        t.idProfesor = idProf;
        t.alumno = alum;
        t.isConfirmado = false;
        t.isCancelado = false;
        
    }
    
    function getMateria() public returns (string) {
        return Tutorias[msg.sender].materia;
    }
    
    function getIdProfesor() public returns (address) {
        return Tutorias[msg.sender].idProfesor;
    }
    
    function getAlumno() public returns (address) {
        return Tutorias[msg.sender].alumno;
    }
    
    function confirmar() public returns (bool) {
        require(Tutorias[msg.sender].idProfesor == msg.sender);
        require(Tutorias[msg.sender].isConfirmado == false);
        return Tutorias[msg.sender].isConfirmado = true;
    }
    
    function cancelar() public returns (bool) {
        require(Tutorias[msg.sender].alumno == msg.sender);
        require(Tutorias[msg.sender].isConfirmado == false);
        require(Tutorias[msg.sender].isCancelado == false);
        return Tutorias[msg.sender].isCancelado = true;
    }
    
    function estaConfirmado() public returns (bool){
        return Tutorias[msg.sender].isConfirmado;
    }
    
}