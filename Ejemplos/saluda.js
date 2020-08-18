const moment = require('moment');

function saluda(nombre) {
  console.log('Hola mundo', nombre,'hoy es', moment().format('LLL'));
}

module.exports = saluda;
