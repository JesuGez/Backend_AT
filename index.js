var express = require('express') //llamamos a Express
const bodyParser = require('body-parser');//------------------


var app = express()   
app.use(bodyParser.json())
//-------------           
var port = process.env.PORT || 8000  // establecemos nuestro puerto
//-- para dar accesos desde cualquier servidor
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

//Routes llama a los controladores
app.use('/', require('./controller/novedadController'));
app.use('/', require('./controller/loginController'));
app.use('/', require('./controller/usuarioController'));

  // iniciamos nuestro servidor
app.listen(port)
console.log('Servidor NodeJs Runing en http://localhost:' + port);
console.log('Para terminar presione las teclas Ctrl+C');