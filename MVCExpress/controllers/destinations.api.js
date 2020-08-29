const express = require('express');
const router = express.Router();
const destinationsModel = require('../models/destinations');
const { verifyAccessToken } = require('../auth');

const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const { uploadFileToS3, uploadFileToFirebaseStorage } = require('../lib/fileUploaders');

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
  // Como subir archivos con node.js
  // https://attacomsian.com/blog/uploading-files-nodejs-express
  try {
    const destination = req.body;
    if (req.files) {
      const destinationPhoto = req.files.image;
      const fileName = destinationPhoto.name;
      const generatedFileName = `${uuid.v4()}${path.extname(fileName)}`;
      const filePathAndName = `./public/images/${generatedFileName}`;
      await destinationPhoto.mv(filePathAndName);
      // destination.image = `/images/${destinationPhoto.name}`;
      // destination.image = await uploadFileToS3(filePathAndName, fileName);
      const storedImageUrl = await uploadFileToFirebaseStorage(filePathAndName);
      destination.image = storedImageUrl;
      fs.unlink(filePathAndName, (err) => {
        if (err) throw err;
        console.log(filePathAndName, 'ha sido eliminado del servidor');
      });
    }
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
