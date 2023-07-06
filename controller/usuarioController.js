const conexion = require('../config/conexion.js');
const { check, validationResult } = require('express-validator');
var express = require('express')
var rutas = express()  

rutas.get('/usuarios', function(req, res) {
    let sql="select * from usuario order by id"
    conexion.query(sql,(err,rows)=>{
    if(err) throw err;
    else{
        res.json(rows)
    }
    })
})

rutas.get('/usuarios/:id', function(req, res) {
    conexion.query("select * from usuario where id = ?", [req.params.id],(err,rows)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

module.exports=rutas;