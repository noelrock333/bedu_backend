var express = require('express');
var router = express.Router();
const destinationsModel = require('../models/destinations');

// Lista de destinos
router.get('/destinations', async function(req, res, next) {
  const destinations = await destinationsModel.getAll();
  res.render('destinations/list', { destinations });
});

// Muestra el formulario creación
router.get('/destinations/new', (req, res) => {
  res.render('destinations/new');
});

// Guarda la información del formulario
router.post('/destinations/create', async (req, res) => {
  const destination = req.body;
  const success = await destinationsModel.create(destination);
  if (success) {
    res.send('Se ha creado correctamente');
  } else {
    res.send('Ha ocurrido un error al crear');
  }
});

// Formulario para editar información
router.get('/destinations/:id/edit', async (req, res) => {
  const id = Number(req.params.id);
  const destination = await destinationsModel.getById(id);
  if (destination) {
    res.render('destinations/edit', { destination })
  } else {
    res.send('No se encontró la información requerida')
  }
});

// Actualiza la información de un destino
router.post('/destinations/:id/save', async (req, res) => {
  const id = Number(req.params.id);
  const destination = req.body;
  const success = await destinationsModel.update(id, destination);
  if (success) {
    res.send('Datos actualizados correctamente');
  } else {
    res.send('Hubo un error al actualizar el registro');
  }
});

// Elimina un registro de destinos de la base de datos
router.get('/destinations/:id/delete', async (req, res) => {
  const id = Number(req.params.id);
  const success = await destinationsModel.destroy(id);
  if (success) {
    res.send('El registro se ha eliminado correctamente');
  } else {
    res.send('No se ha podido eliminar el registro');
  }
})

router.get('/api/v1/destinations', async (req, res, next) => {
  const destinations = await destinationsModel.getAll();
  res.json({ destinations });
});

router.get('/api/v1/destinations/:id/show', async (req, res, next) => {
  const destinations = await destinationsModel.getAll();
  const id = Number(req.params.id);
  const destination = await destinationsModel.getById(id);
  res.json({ destination });
});

module.exports = router;
