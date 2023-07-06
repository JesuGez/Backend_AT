const express = require('express');
const bcrypt = require('bcryptjs');
const authService = require('../services/authService');

var rutas = express();

rutas.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // Buscar al usuario en la base de datos
    const user = authService.findUserByUsername(username);

    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    // Verificar la contraseña
    const passwordMatch = await authService.verifyPassword(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    const token = authService.generateToken(username);
    res.json({ token });

    // Autenticación exitosa
    res.json({ message: 'Inicio de sesión exitoso' });
});

module.exports = rutas;