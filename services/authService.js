const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const conexion = require('../config/conexion.js');
const { json } = require('express');


const generateToken = (userId) => {
  const payload = {
    userId: userId,
  };
  const token = jwt.sign(payload, 'SonGohan', { expiresIn: '1h' });
  return token;
};

function findUserByUsername(username) {
  return new Promise((resolve, reject) => {
    conexion.query("select * from usuario where username = ?", [username], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}


async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
  findUserByUsername,
  verifyPassword,
  generateToken
};