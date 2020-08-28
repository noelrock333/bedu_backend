const express = require('express');
const router = express.Router();
const destinationsModel = require('../models/destinations');
const { verifyAccessToken } = require('../auth');

// var admin = require("firebase-admin");
// const { Storage } = require('@google-cloud/storage');

// var serviceAccount = require("../curso-react-928c8-firebase-adminsdk-mklf1-7e107ec456.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   // databaseURL: "https://curso-react-928c8.firebaseio.com",
//   storageBucket: "gs://curso-react-928c8.appspot.com"
// });

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
      let destinationPhoto = req.files.image;
      const filename = `./public/images/${destinationPhoto.name}`;
      destinationPhoto.mv(filename);
      destination.image = `/images/${destinationPhoto.name}`;

      // Cloud storage
      // var bucket = admin.storage().bucket();
      // const storage = new Storage();
      // const uploadedFile = await storage.bucket(bucket.name).upload(filename, {
      //   gzip: true,
      //   metadata: {
      //     cacheControl: 'public, max-age=31536000',
      //   },
      // });
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
