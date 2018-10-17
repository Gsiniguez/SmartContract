var express = require("express");
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

app.use(express.static(__dirname + '/View'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',function(req,res){
  res.sendFile('index.html');
});

app.post('/',function(req,res){
    let materia = req.body.materia;
    let profesor = req.body.profesor;
    let smartcontractAddress = req.body.address;
    myContract = new web3.eth.Contract(abiDefinition,smartcontractAddress, {data:byteCode,gasPrice:'1000',gas:200000});
    myContract.methods.solicitar(materia,profesor).send({from:'0xfd730bab2d10d2179aec947409e2f0c5d1ac5021',gas:200000});

})

app.get('/about',function(req,res){
  res.sendFile('/about.html');
});

app.get('/sitemap',function(req,res){
  res.sendFile('/sitemap.html');
});

// WEB3 y SOLC
Web3 = require('web3');
fs = require('fs')
solc = require('solc')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var Accounts = require('web3-eth-accounts');
var usuarios ;
web3.eth.getAccounts(console.log);

code = fs.readFileSync('./Script/tutoria.sol').toString() 

compiledCode = solc.compile(code)

abiDefinition = JSON.parse(compiledCode.contracts[':Tutoria'].interface) //Su contrato inteligente

byteCode = compiledCode.contracts[':Tutoria'].bytecode //Su contrato inteligente

TutoriaContract = new web3.eth.Contract(abiDefinition,{data: byteCode, from: '0xfd730bab2d10d2179aec947409e2f0c5d1ac5021', gas: 6721975})

TutoriaContract.deploy({data:byteCode}).send({from:'0xfd730bab2d10d2179aec947409e2f0c5d1ac5021',gas: 6721975, gasPrice: '1000'});



app.listen(3000);

console.log("Running at Port 3000");








function click(){
    myContract.methods.getMateria().send({from:'0xfd730bab2d10d2179aec947409e2f0c5d1ac5021',gas:200000});
}