const conexion = require('../config/conexion.js');
const { check, validationResult } = require('express-validator');
var express = require('express')
const cors = require('cors');
var rutas = express()  

rutas.use(cors())
//---------------- define las rutas de la API-------------------
rutas.get('/', function(req, res) {
    res.json({ mensaje: '¡Hola Mundo!' })  
})

//Guardar registro
rutas.post('/registrar_novedad', [
    check('nombre').isLength({min: 1}),
    check('celular').isNumeric(),
    check("correo").isEmail(),
    check("direccion").isLength({ min: 1}),
    check("novedad").isLength({ min: 1}),
    check("nivel").isLength({ min: 1}),
    check("usuario").isLength({ min: 1})
], function(req, res) {
    let sql = "insert into registro_novedad set ?"
    const fecha = new Date
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array() })
    }
    console.log('Registro recibido: ',req.body);
    let poststr = {
        nombre: req.body.nombre,
        celular : req.body.celular,
        correo: req.body.correo,
        direccion: req.body.direccion,
        novedad: req.body.novedad,
        nivel: req.body.nivel,
        usuario: req.body.usuario,
        modified: fecha
    }
   conexion.query(sql, poststr, function (error, results) {
    if (error) throw error;
    if (results.affectedRows) {
     res.json({status: 'Registro guardado'})
   }
   else
     res.json({status: 'No se pudo guardar'})
    
  });  
})

//---------------- Fin define las rutas de la API-------------------

module.exports = rutas; //para exportar y usar en otro lado