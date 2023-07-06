const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const conexion = require('../config/conexion.js');


// Simulación de una base de datos de usuarios
const users = findUsuariosAll();

const generateToken = (userId) => {
    const payload = {
      userId: userId,
    };
    const token = jwt.sign(payload, 'SonGohan', { expiresIn: '1h' });
    return token;
  };

function findUserByUsername(username) {
  let sql="select * from usuario order by id"
    conexion.query(sql,(err,rows)=>{
    if(err) throw err;
    else{
        return rows
    }
    })
}

function findUsuariosAll(username) {
    let sql="select * from usuario order by id"
    conexion.query(sql,(err,rows)=>{
    if(err) throw err;
    else{
        return rows
    }
    })
}

async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
  findUserByUsername,
  verifyPassword,
  generateToken
};