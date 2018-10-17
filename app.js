var express = require("express");
var app     = express();
app.use(express.static(__dirname + '/View'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.

app.get('/',function(req,res){
  res.sendFile('index.html');
});

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

web3.eth.getAccounts(console.log)

code = fs.readFileSync('./Script/tutoria.sol').toString() 

compiledCode = solc.compile(code)

abiDefinition = JSON.parse(compiledCode.contracts[':Tutoria'].interface) //Su contrato inteligente

byteCode = compiledCode.contracts[':Tutoria'].bytecode //Su contrato inteligente

TutoriaContract = new web3.eth.Contract(abiDefinition,{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})

TutoriaContract.deploy({data:byteCode}).send({from:'0xf28152f29d43a32323d4b9846e6e66975441a8f6',gas: 1500000, gasPrice: '30000000000000'});

myContract = new web3.eth.Contract(abiDefinition,'0x0687e144f7795600fc5dfce85281de7c096223fc', {data:byteCode,gasPrice:'20000000000'});


app.listen(3000);

console.log("Running at Port 3000");