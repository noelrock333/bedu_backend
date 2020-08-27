const express = require('express');
const router = express.Router();
const usersModel = require('../models/users');
const { getHash, generateAccessToken } = require('../auth');

router.post('/create', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = {
      name,
      email,
      password: getHash(password),
    };
    await usersModel.create(user);
    // 201 Creado
    res.sendStatus(201);
  } catch (err) {
    // 409 Conflicto
    res.send({ error: err.message }).status(409);
  }
});

router.post('/authenticate', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersModel.getByEmail(email);
    console.log(user);
    if (user.password === getHash(password)) {
      const jwt = generateAccessToken(user);
      console.log(jwt)
      res.json({ token: jwt });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    // 409 Conflicto
    res.json({ error: err.message }).status(409);
  }
});


module.exports = router;