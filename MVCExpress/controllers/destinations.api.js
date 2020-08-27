const express = require('express');
const router = express.Router();
const destinationsModel = require('../models/destinations');
const { verifyAccessToken } = require('../auth');

router.get('/', verifyAccessToken, async (req, res, next) => {
  try {
    const destinations = await destinationsModel.getAll();
    res.json({ destinations });
  } catch (err) {
    // 500 Error interno del servidor
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/show', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const destination = await destinationsModel.getById(id);
    res.json({ destination });
  } catch (err) {
    // 500 Error interno del servidor
    res.status(500).json({ error: err.message });
  }
});

router.post('/create', async (req, res) => {
  try {
    const destination = req.body;
    await destinationsModel.create(destination);
    // 201 Creado
    res.sendStatus(201);
  } catch (err) {
    // 409 Conflicto
    res.status(409).json({ error: err.message });
  }
});

router.put('/:id/edit', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const destination = req.body;
    await destinationsModel.update(id, destination);
    // 204 Modificado/Eliminado
    res.sendStatus(204);
  } catch (err) {
    // 409 Conflicto
    res.status(409).json({ error: err.message });
    // 500 Error interno del servidor
    // res.status(500);
  }
});

router.delete('/:id/delete', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await destinationsModel.destroy(id);
    res.sendStatus(204);
  } catch (err) {
    // 500 Error interno del servidor
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
