var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/View'));
app.use(bodyParser.urlencoded({ extend: true }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



let config = {
  addressContract: null,
  tutos:[]
};


let tutoActual = {
  tuto:[]
}



//POST Deploy
app.post('/deploy', function (req, res) {
  TutoriaContract = new web3.eth.Contract(abiDefinition, { data: byteCode, from: web3.eth.accounts[0], gasPrice: '1000', gas: 6721975 });
  TutoriaContract.deploy({ data: byteCode }).send({ from:'0xfd730bab2d10d2179aec947409e2f0c5d1ac5021', gas: 6721975, gasPrice: '1000' }).then((e) => {
    config.addressContract = e.options.address;
    res.redirect('/');
  });
})

//Render index.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/View/index.html');
  res.render()
});
//POST Solicitar
app.post('/', function (req, res) {
  let usuario = req.body.usuario;
  let materia = req.body.materia;
  let profesor = req.body.profesor;
  if (profesor == usuario) {
    res.send("Usuario y Profesor no pueden ser el mismo.")
  }

  myContract = new web3.eth.Contract(abiDefinition, config.addressContract, { data: byteCode, gasPrice: '1000', gas: 200000 });
  myContract.methods.solicitar(materia, profesor)
  .send({ from: usuario, gas: 200000 })
  myContract.methods.solicitar(materia,profesor)
  .call({from:usuario})
  .then(e => {
    console.log(e)
    config.tutos.push({'usuario':usuario,'key':e})
  })
})
//Render metodos.html
app.get('/metodos', function (req, res) {
  res.sendFile(__dirname + '/View/metodos.html'); 
})

app.get('/tutoria', function (req, res) {
  res.sendFile(__dirname + '/View/tutoria.html');
})

app.post('/tutoria', function(req,res){
  let usuario = req.body.usuario;
  tutoActual.tuto = []
  for (let x in config.tutos){
    if (usuario == config.tutos[x].usuario){
      tutoActual.tuto.push(config.tutos[x].key)
    }
  }
  res.redirect('/metodos')
})

//POST METODOS
app.post('/metodos', function (req, res) {
  let usuario = req.body.usuario;
  let profesor = req.body.profesor;
  let metodo = req.body.metodo;
  let tuto = req.body.tuto;
  switch (metodo) {
    case "1":
      myContract.methods.getMateria(tutoActual.tuto[tuto]).call().then(e => {

        if (e.length < 1) {
          res.send('Usuario Invalido')
        }
        var respuesta = 'RESPUESTA AL METODO getMateria(): ';
        for (let index = 0; index < e.length; index++) {
          const a = e[index];
          respuesta += a.toString();
        }
        res.send(respuesta);
      });
      break;
    case "2":
      myContract.methods.getFecha(tutoActual.tuto[tuto]).call().then(e => {

        if (e.length < 1) {
          res.send('Usuario Invalido')
        }
        var respuesta = 'RESPUESTA AL METODO getFecha(): ';
        for (let index = 0; index < e.length; index++) {
          const a = e[index];
          respuesta += a.toString();
        }
        res.send(respuesta);
      });
      break;
    case "3":
      myContract.methods.getIdProfesor(tutoActual.tuto[tuto]).call().then(e => {

        if (e.length < 1) {
          res.send('Usuario Invalido')
        }
        var respuesta = 'RESPUESTA AL METODO getIdProfesor(): ';
        for (let index = 0; index < e.length; index++) {
          const a = e[index];
          respuesta += a.toString();
        }
        res.send(respuesta);
      });
      break;
    case "4":
      myContract.methods.getAlumno(tutoActual.tuto[tuto]).call().then(e => {

        if (e.length < 1) {
          res.send('Usuario Invalido')
        }
        var respuesta = 'RESPUESTA AL METODO getAlumno(): ';
        for (let index = 0; index < e.length; index++) {
          const a = e[index];
          respuesta += a.toString();
        }
        res.send(respuesta);
      });
      break;
    case "5":
      myContract.methods.confirmar(tutoActual.tuto[tuto]).send({ from: profesor, gas: 200000 }).then(e => {
        if (e.length < 1) {
          res.send('Usuario Invalido')
        }
        var respuesta = 'RESPUESTA AL METODO confirmar(): CONFIRMADO :-)';
        res.send(respuesta);
      });
      break;
    case "6":
      myContract.methods.cancelar(tutoActual.tuto[tuto]).send({ from: usuario, gas: 200000 }).then(e => {
        if (e.length < 1) {
          res.send('Usuario Invalido')
        }
        var respuesta = 'RESPUESTA AL METODO cancelar(): CANCELADO :-(';
        res.send(respuesta);
      });
      break;
    case "7":
      myContract.methods.estaConfirmado(tutoActual.tuto[tuto]).call().then(e => {

        if (e.length < 1) {
          res.send('Usuario Invalido')
        }
        var respuesta = 'RESPUESTA AL METODO estaConfirmado(): ';

        respuesta += e

        res.send(respuesta);
      });
      break;
    case "8":
      myContract.methods.estaCancelado(tutoActual.tuto[tuto]).call().then(e => {

        if (e.length < 1) {
          res.send('Usuario Invalido')
        }
        var respuesta = 'RESPUESTA AL METODO estaCancelado(): ';

        respuesta += e;

        res.send(respuesta);
      });
      break;
  }
})

// WEB3 y SOLC
Web3 = require('web3');
fs = require('fs')
solc = require('solc')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.getAccounts(console.log);

code = fs.readFileSync('./Script/tutoria.sol').toString()

compiledCode = solc.compile(code)

abiDefinition = JSON.parse(compiledCode.contracts[':Tutoria'].interface) //Su contrato inteligente

byteCode = compiledCode.contracts[':Tutoria'].bytecode //Su contrato inteligente

//TutoriaContract = new web3.eth.Contract(abiDefinition,{data: byteCode, from: '0xfd730bab2d10d2179aec947409e2f0c5d1ac5021',gasPrice:'1000', gas: 6721975})

//TutoriaContract.deploy({data:byteCode}).send({from:'0xfd730bab2d10d2179aec947409e2f0c5d1ac5021',gas: 6721975, gasPrice: '1000'});




app.listen(3005);

console.log("Running at Port 3005");







