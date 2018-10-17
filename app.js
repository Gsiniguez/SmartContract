var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({extend:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);
app.use(express.static(__dirname + '/View'));


//Posts
app.post('/deploy',function(req,res){
  //Codigo
  TutoriaContract = new web3.eth.Contract(abiDefinition,{data: byteCode,address:'0000730bab2d10d2179aec947409e2f0c5d1ac5021' ,from: '0xfd730bab2d10d2179aec947409e2f0c5d1ac5021',gasPrice:'1000', gas: 6721975});
  TutoriaContract.deploy({data:byteCode}).send({from:'0xfd730bab2d10d2179aec947409e2f0c5d1ac5021',gas: 6721975, gasPrice: '1000'});
  res.redirect('/');
})

app.get('/',function(req,res){
  res.sendFile(__dirname + '/View/index.html');
  res.render()
});

app.post('/',function(req,res){
    let materia = req.body.materia;
    let profesor = req.body.profesor;
    let address = req.body.address;

    myContract = new web3.eth.Contract(abiDefinition,address, {data:byteCode,gasPrice:'1000',gas:200000});
    myContract.methods.solicitar(materia,profesor).send({from:'0xfd730bab2d10d2179aec947409e2f0c5d1ac5021',gas:200000});

})

app.get('/getmateria',function(req,res){
  
  myContract.methods.getMateria('0xfd730bab2d10d2179aec947409e2f0c5d1ac5021').call().then(e => {
    var respuesta = 'Materia: ';
      

      for (let index = 0; index < e.length; index++) {
        const a = e[index];
        respuesta += a.toString();
      }    
      
      res.send(respuesta);
  });
  //res.sendFile(__dirname + '/View/getmateria.html',{materia:mate});
});

app.get('/sitemap',function(req,res){
  res.sendFile('/sitemap.html');
});

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




app.listen(3001);

console.log("Running at Port 3000");







