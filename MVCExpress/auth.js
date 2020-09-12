const crypto = require('crypto');
const jwt = require("jsonwebtoken");
// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs

function verifyAccessToken(req, res, next) {
  // Obtiene el token de acceso JWT desde el request header (cabecera de la petición http)
  const token = req.get('Authorization');
  if (!token) return res.sendStatus(401); // Si no existe un token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user; // Agrega la propiedad "user" al objeto del request de la siguiente función
    next(); // Prosigue con la ejecución del request (petición http) hacia donde el cliente quiere llegar
  })
}

function generateAccessToken(user) {
  // Genera un JWT (JSON Web Token) que expira después de media hora (1800 segundos = 30 minutos)
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
}

function getHash(password) {
  // Le enviamos una contraseña y nos regresa un hash el cual no tiene reversa
  return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

module.exports = {
  verifyAccessToken,
  generateAccessToken,
  getHash
};
