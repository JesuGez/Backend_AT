const express = require('express');
const bcrypt = require('bcryptjs');
const authService = require('../services/authService');

var rutas = express();

rutas.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    var user;
    try {
        user = await authService.findUserByUsername(username);
    } catch (error) {
        console.error(error);
    }
    
    if (!user[0]) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const passwordMatch = await authService.verifyPassword(password, user[0].password);

    if (!passwordMatch) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = authService.generateToken(username);

    res.json({ message: 'Inicio de sesión exitoso', token: token });
});

rutas.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    const token = authService.generateToken(username);

    res.json({ message: 'Registro exitoso', token: token });
});

module.exports = rutas;