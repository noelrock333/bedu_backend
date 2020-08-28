const express = require('express');
const router = express.Router();
const destinationsModel = require('../models/destinations');
const { verifyAccessToken } = require('../auth');

const path = require('path')
const uuid = require('uuid');
const fs = require('fs');
const AWS = require('aws-sdk');

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

const uploadFileToS3 = async (filePathAndName, fileName) => {
  // Subiendo archivos a S3 Amazon Web Services
  // https://stackabuse.com/uploading-files-to-aws-s3-with-node-js
  // Haciendo público contenido del bucket
  // https://havecamerawilltravel.com/photographer/how-allow-public-access-amazon-bucket/
  const { AWS_ACCESS_KEY_ID, AWS_SECRET_KEY, S3_BUCKET_NAME } = process.env;
  const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_KEY
  });
  const fileContent = fs.readFileSync(filePathAndName);
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: `${uuid.v4()}${path.extname(fileName)}`, // El nombre del archivo que quieres guardar en S3
    Body: fileContent,
    ACL: 'public-read' // Concede permisos de lectura publica al archivo
  };

  // Subiendo archivos al bucket
  return new Promise((resolve, reject) => {
    s3.upload(params, function(err, data) {
      if (err) {
        return reject(err);
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      return resolve(data.Location);
    });
  })
};

router.post('/create', async (req, res) => {
  // Como subir archivos con node.js
  // https://attacomsian.com/blog/uploading-files-nodejs-express
  try {
    const destination = req.body;
    if (req.files) {
      let destinationPhoto = req.files.image;
      const filePathAndName = `./public/images/${destinationPhoto.name}`;
      const fileName = destinationPhoto.name;
      await destinationPhoto.mv(filePathAndName);
      // destination.image = `/images/${destinationPhoto.name}`;
      destination.image = await uploadFileToS3(filePathAndName, fileName);
      fs.unlink(filePathAndName);

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
